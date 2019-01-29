import * as React from 'react';
import * as R from 'ramda';
import styled from 'styled-components';

import { filterTotalCounts } from './utils';
import { Dictionary } from 'ramda';
import NumberBadge from './components/NumberBadge';
import LabelInfo, { LabelInfoProps } from './components/LabelInfo';
import Search from './components/SearchForm';
import LanguagesRadar from './components/LanguageRadar';
import CommitHistory from './components/CommitHistory';

const Numbers = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, 170px);
  grid-gap: 1rem;
  justify-content: center;
`;

const Labels = styled(Numbers)`
  grid-template-columns: repeat(auto-fit, 250px);
`;

interface Commit {
  additions: number;
  deletions: number;
  changedFiles: number;
  committedDate: string;
  pushedDate: string;
}

interface AppState extends Dictionary<any> {
  languages: {
    edges: any[];
  };
  ref: {
    target: {
      history: {
        nodes: Array<Commit>
      };
    };
  };
}

const initialState: AppState = {
  languages: {
    edges: [],
  },
  ref: {
    target: {
      history: {
        nodes: [],
      },
    },
  },
};

type History = AppState["ref"]["target"]["history"];
function App() {
  const [github, setGithub] = React.useState<AppState>(initialState);
  const totalCounts = filterTotalCounts(github)
  const labels = R.pathOr<[], Array<LabelInfoProps>>([], ['labels', 'nodes'], github);
  const languages = R.prop('languages', github);

  // Commits
  const history = R.path<'ref', 'target', 'history', History>(['ref', 'target', 'history'], github);
  const additions = R.pluck('additions')(history.nodes);
  const changedFiles = R.pluck('changedFiles')(history.nodes);
  const deletions = R.pluck('deletions')(history.nodes);
  const commitLabels = R.map(R.pipe(R.prop<Commit, 'committedDate'>('committedDate'), R.split('T'), R.head))(history.nodes);
  return (
    <div className="App">
      <Search onLoaded={setGithub} />
      {history.nodes.length > 0 && <CommitHistory {...{ additions, commitLabels, changedFiles, deletions }} />}
      <Numbers>
        {
          R.pipe(
            R.toPairs,
            R.sortBy(R.path([1, 'totalCount']) as any),
            R.map<[string, { totalCount: number }], JSX.Element>(([title, { totalCount }]) => (
              <NumberBadge key={title} title={title} number={totalCount} />
            )),
            R.values
          )(totalCounts)
        }
      </Numbers>
      <Labels>
        {
          R.map(({ color, name, issues, pullRequests }) =>
            <LabelInfo key={name} {...{ color, name, issues, pullRequests }} />
            , labels)
        }
      </Labels>
      <div>
        {
          languages.edges.length > 0 &&
          <LanguagesRadar languages={languages} />
        }
      </div>
    </div>
  );
}

export default App;
