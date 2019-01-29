import * as React from 'react';
import * as R from 'ramda';
import styled from 'styled-components';
import { useLoading } from '@swyx/hooks';
import { BarLoader } from 'react-css-loaders';

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

const notEmpty = R.pipe(R.isEmpty, R.not);

const AppContainer = styled.div`
  min-width: 100vw;
  min-height: 100vh;
  display: grid;
  grid-row-gap: 1rem;
  grid-template-rows: 80px;
  background-color: var(--colorBGMedium);
  padding: 2rem;
  box-sizing: border-box;
`;

function App() {
  const [isLoading, load] = useLoading();
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
    <AppContainer>
      <Search
        onLoaded={setGithub}
        {...{ load, isLoading }}
      />
      {isLoading ? <BarLoader /> : null}
      {notEmpty(history.nodes) && <CommitHistory {...{ additions, commitLabels, changedFiles, deletions }} />}
      {notEmpty(totalCounts) &&
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
      }
      {notEmpty(labels) && <Labels>
        {
          R.map(({ color, name, issues, pullRequests }) =>
            <LabelInfo key={name} {...{ color, name, issues, pullRequests }} />
            , labels)
        }
      </Labels>
      }
      {notEmpty(languages.edges) &&
        <LanguagesRadar languages={languages} />
      }
    </AppContainer>
  );
}

export default App;
