import * as React from 'react';
import axios from 'axios';
import { useLoading } from '@swyx/hooks';
import * as R from 'ramda';
import styled from 'styled-components';

import { getRepository, filterTotalCounts } from './utils';

interface NumberBadgeProps {
  number: number;
  title?: string;
  emoji?: string;
}

const BadgeContainer = styled.div`
  border-radius: 5px;
  box-shadow: 5px 5px 30px 6px var(--colorBGDark);
  padding: 1rem;
  max-height: 50px;
  background-color: var(--colorBGWhite);
`

const BadgeNumber = styled.div`
  font-size: 1.5rem;
  font-weight: 200;
`;

const BadgeTitle = styled.div`
  opacity: 0.5;
`;

const NumberBadge: React.SFC<NumberBadgeProps> = ({ title, number }) => (
  <BadgeContainer>
    <BadgeNumber>{number}</BadgeNumber>
    <BadgeTitle>{title}</BadgeTitle>
  </BadgeContainer>
);

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

const Numbers = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, 170px);
  grid-gap: 1rem;
  justify-content: center;
`;

function App() {
  const [github, setGithub] = React.useState({});
  const totalCounts = filterTotalCounts(github)
  return (
    <div className="App">
      <Search onLoaded={setGithub} />
      <Numbers>
        {
          R.pipe(
            R.mapObjIndexed<{ totalCount: number }, JSX.Element, string>((value, title) => (
              <NumberBadge key={title} title={title} number={value.totalCount} />
            )),
            R.values
          )(totalCounts)
        }
      </Numbers>
    </div>
  );
}

export default App;
