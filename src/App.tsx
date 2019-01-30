import * as React from 'react';
import * as R from 'ramda';
import styled from 'styled-components';
import { useLoading } from '@swyx/hooks';
import { BarLoader } from 'react-css-loaders';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';

import { filterTotalCounts } from './utils';
import { Dictionary } from 'ramda';
import { LabelInfoProps } from './components/LabelInfo';
import Search from './components/SearchForm';
import LanguagesRadar from './components/LanguageRadar';
import CommitHistory from './components/CommitHistory';
import Numbers from './components/Numbers';
import Labels from './components/Labels';

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
  grid-template-rows: 80px min-content;
  background-color: var(--colorBGMedium);
  padding: 2rem;
  box-sizing: border-box;
`;

const Header = styled.div`
  max-width: 1440px;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  justify-self: center;
  flex-wrap: wrap;
`;

const Error = styled.p`
  color: red;
`;
function App() {
  const [isLoading, load] = useLoading();
  const [github, setGithub] = React.useState<AppState>(initialState);
  const [errors, setErrors] = React.useState([]);

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
    <Router>
      <AppContainer>
        <Header>
          <NavLink to="/">Commits</NavLink>
          <NavLink to="/totals">Totals</NavLink>
          <Search
            onError={(error) =>{
              setGithub(initialState);
              setErrors(errors.concat(error))
            }}
            onLoaded={(github) =>{
              setGithub(github);
              setErrors([]);
            }}
            {...{ load, isLoading }}
          />
          <NavLink to="/labels">Labels</NavLink>
          <NavLink to="/languages">Languages</NavLink>
        </Header>
        {notEmpty(errors) && <div>
          {R.map(({msg}) => <Error key={msg}>{msg}</Error>, errors)}
        </div>}
        {isLoading
          ? <BarLoader />
          : <React.Fragment>
            <Route
              path="/"
              exact
              render={() => notEmpty(history.nodes) ? <CommitHistory {...{ additions, commitLabels, changedFiles, deletions }} /> : null}
            />
            <Route path="/totals" component={() => notEmpty(totalCounts) ? <Numbers totalCounts={totalCounts} /> : null} />
            <Route path="/labels" component={() => notEmpty(labels) ? <Labels labels={labels} /> : null} />
            <Route path="/languages" component={() => notEmpty(languages.edges) ? <LanguagesRadar languages={languages} /> : null} />
          </React.Fragment>
        }
      </AppContainer>
    </Router>
  );
}

export default App;
