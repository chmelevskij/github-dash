
import * as React from 'react';
import * as R from 'ramda';
import axios from 'axios';
import styled from 'styled-components';
import { useLoading } from '@swyx/hooks';

import { getRepository } from '../utils';

const SearchContainer = styled.div`
  align-self: center;
  justify-self: center;
  display: flex;
  box-shadow: 5px 5px 30px 6px var(--colorBGDark);
`;

const SearchInput = styled.input.attrs({
  type: 'text',
})`
  border: none;
  padding: 1rem;
  font-size: 2rem;
  border-top-left-radius: 1rem;
  border-bottom-left-radius: 1rem;
  font-weight: 200;
  letter-spacing: 2px;
`;

const SearchButton = styled.button.attrs({
  type: 'button',
})`
  border-top-right-radius: 1rem;
  border-bottom-right-radius: 1rem;
  width: 150px;
  font-size: 2rem;
`;

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
    <SearchContainer>
      <SearchInput
        placeholder="Github url..."
        value={search}
        onChange={({ target }) => setSearch(target.value)} />
      <SearchButton onClick={handleClick}>
        {isLoading ? 'Loading...' : 'GO'}
      </SearchButton>
    </SearchContainer>
  );
}

export default Search;
