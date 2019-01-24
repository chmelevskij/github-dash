import * as React from 'react';
import axios from 'axios';
import './App.css';

import { useLoading } from '@swyx/hooks';

function Input() {
  const [isLoading, load] = useLoading();
  const [search, setSearch] = React.useState('');

  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    load(
      axios.get(`/.netlify/functions/github?repo=${search}`).then(resp => console.log(resp.data)) // TODO: handle bad on client
    );
  };

  return (
    <div>
      <input type="text" value={search} onChange={({ target }) => setSearch(target.value)}/>
      <button onClick={handleClick}>
        {isLoading ? 'Loading...' : 'Search'}
      </button>
    </div>
  );
}

function App() {
  return (
    <div className="App">
    <Input />
    </div>
  );
}

export default App;
