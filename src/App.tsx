import * as React from 'react';
import axios from 'axios';
import { useLoading } from '@swyx/hooks';
import * as R from 'ramda';
import styled from 'styled-components';
import { Radar } from 'react-chartjs-2';
import Color from 'color';

import { getRepository, filterTotalCounts } from './utils';
import { Dictionary } from 'ramda';

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

const Labels = styled(Numbers)`
  grid-template-columns: repeat(auto-fit, 250px);
`;
interface LabelNode {
  name: string;
  color: string;
  issues: {
    totalCount: number;
  }
  pullRequests: {
    totalCount: number;
  }
}

const Label = styled('div')<{
  backgroundColor: string;
}>`
  background-color: ${({ backgroundColor }) => `#${backgroundColor}`};
  padding: 1rem;
  border-radius: 5px;
  box-shadow: 5px 5px 30px 6px var(--colorBGDark);
  position: relative;
  min-height: 50px;
`;

const LabelPrIssueContainer = styled.div`
 width: 100%;
 position: absolute;
 bottom: 0;
 margin: 0 -1rem;
 display: flex;
 height: 1.5rem;

 & :first-child {
  border-bottom-left-radius: 5px;
 }

 & :last-child {
  border-bottom-right-radius: 5px;
 }
`;

const LabelPrIssueContainerInfo = styled(LabelPrIssueContainer)`
  justify-content: space-around;
  align-items: center;
`;
const LabelBar = styled('div')<{ backgroundColor: string, width: number }>`
  width: ${({ width }) => width}%;
  background-color: ${({ backgroundColor }) => backgroundColor};
`;

const LabelName = styled('span')<{ color: 'white' | 'black'}>`
  color: ${({ color }) => color};
  font-weight: 600;
`;

const getPercentage = (v1: number, v2: number) => v1 || v2 ? (v1 / (v1 + v2) * 100) : 0;

interface AppState extends Dictionary<any>{
  languages?: { [key: string]: number}
}

function App() {
  const [github, setGithub] = React.useState<AppState>({});
  const totalCounts = filterTotalCounts(github)
  const labels = R.pathOr<[], Array<LabelNode>>([], ['labels', 'nodes'], github);
  const languages = R.prop('languages', github);
  return (
    <div className="App">
      <Search onLoaded={setGithub} />
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
          // TODO: handle 0 and 0 case
          R.map(({ color, name, issues, pullRequests }) =>
            <Label key={name} backgroundColor={color}>
              <LabelName
              color={Color('#' + color).isDark() ? 'white' : 'black'}
              >
                {name}
              </LabelName>
              <LabelPrIssueContainer >
                <LabelBar
                  backgroundColor="#cb2431"
                  width={getPercentage(issues.totalCount, pullRequests.totalCount)}
                />
                <LabelBar
                  backgroundColor="#2cbe4e"
                  width={getPercentage(pullRequests.totalCount, issues.totalCount)}
                />
              </LabelPrIssueContainer>
              <LabelPrIssueContainerInfo>
                <span style={{ color: 'white' }}>
                  {issues.totalCount} issues
                </span>
                <span style={{ color: 'white' }}>
                  {pullRequests.totalCount} prs
                </span>
              </LabelPrIssueContainerInfo>
            </Label>
            , labels)
        }
      </Labels>
      <div>
        {
          languages &&
          <Radar
            options={{
                legend: {
                  display: false,
                },
                scale: {
                  ticks: {
                    callback: (value: number) => value + 'kb',
                  }
                }
              }}
            data={{
              labels: R.keys(languages),
              datasets: [{
                data: R.pipe(R.values, R.pluck('size'), R.map(R.divide(R.__, 100)))(languages) as number[],
                backgroundColor: 'hsla(2, 86%, 45%, 0.2)',
                borderColor: 'hsla(2, 86%, 45%, 0.6)',
                pointBackgroundColor: R.pipe(R.values, R.pluck('color'))(languages),
                pointRadius: 5,
              }],
            }}
          />
        }
      </div>
    </div>
  );
}

export default App;
