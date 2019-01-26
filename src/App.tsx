import * as React from 'react';
import axios from 'axios';
import { useLoading } from '@swyx/hooks';
import * as R from 'ramda';

import { getRepository, filterTotalCounts } from './utils';
import './App.css';

interface NumberBadgeProps {
  number: number;
  title?: string;
  emoji?: string;
}

const NumberBadge: React.SFC<NumberBadgeProps> = ({ title, number}) => (
  <div>
    <span>{number}</span>
    <span>{title}</span>
  </div>
);

interface SearchProps {
  onLoaded: (github: any) => void;
}

const Search: React.SFC<SearchProps> = ({ onLoaded }) => {
  const [isLoading, load] = useLoading();
  const [search, setSearch] = React.useState('');

  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    load(
      axios.get(`/.netlify/functions/github?repo=${search}`)
        .then(R.pipe(getRepository, onLoaded)) // TODO: handle bad on client
    );
  };

  return (
    <div>
      <input type="text" value={search} onChange={({ target }) => setSearch(target.value)} />
      <button onClick={handleClick}>
        {isLoading ? 'Loading...' : 'Search'}
      </button>
    </div>
  );
}

function App() {
  const [github, setGithub] = React.useState({});
  const totalCounts = filterTotalCounts(github)
  console.log(totalCounts)
  return (
    <div className="App">
      <Search onLoaded={setGithub} />
      <div>
        {
          R.pipe(
            R.mapObjIndexed<{ totalCount: number }, JSX.Element, string>((value, title) => (
              <NumberBadge key={title} title={title} number={value.totalCount} />
            )),
            R.values
          )(totalCounts)
        }
      </div>
      <div>
      </div>
    </div>
  );
}

export default App;
