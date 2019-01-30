
import * as React from 'react';
import * as R from 'ramda';
import axios from 'axios';
import styled from 'styled-components';

import { getRepository } from '../utils';

const SearchForm = styled.form`
  align-self: center;
  justify-self: center;
  display: flex;
  box-shadow: 5px 5px 30px 6px var(--colorBGDark);
`;

const SearchInput = styled.input.attrs({
  type: 'url',
  pattern: 'https://github.com/.*'
})`
  border: none;
  padding: 1rem;
  font-size: 2rem;
  border-top-left-radius: 1rem;
  border-bottom-left-radius: 1rem;
  font-weight: 200;
  letter-spacing: 2px;

  &:invalid {
    border: red solid;
  }
`;

const SearchButton = styled.button.attrs({
  type: 'submit',
})`
  border-top-right-radius: 1rem;
  border-bottom-right-radius: 1rem;
  width: 150px;
  font-size: 2rem;
`;

interface SearchProps {
  onLoaded: (github: any) => void;
  isLoading: boolean;
  load: (...args: any) => void;
  onError: React.Dispatch<React.SetStateAction<never[]>>;
}

const Search: React.SFC<SearchProps> = ({ onLoaded, isLoading, load }) => {
  const [search, setSearch] = React.useState('');

  const handleSubmit = (
    e: React.FormEvent
  ) => {
    e.preventDefault();
    load(
      axios.get(`/.netlify/functions/github?repo=${search}`)
        .then(R.pipe(getRepository, onLoaded)) // TODO: handle bad on client
    );
  };

  return (
    <SearchForm onSubmit={handleSubmit} >
      <SearchInput
        placeholder="Github url..."
        value={search}
        onChange={({ target }) => setSearch(target.value)} />
      <SearchButton>
        {isLoading ? 'Loading...' : 'GO'}
      </SearchButton>
    </SearchForm>
  );
}

export default Search;
