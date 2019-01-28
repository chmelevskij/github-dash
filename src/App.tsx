import * as React from 'react';
import * as R from 'ramda';
import styled from 'styled-components';

import { filterTotalCounts } from './utils';
import { Dictionary } from 'ramda';
import NumberBadge from './components/NumberBadge';
import LabelInfo, { LabelInfoProps } from './components/LabelInfo';
import Search from './components/SearchForm';
import LanguagesRadar from './components/LanguageRadar';

const Numbers = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, 170px);
  grid-gap: 1rem;
  justify-content: center;
`;

const Labels = styled(Numbers)`
  grid-template-columns: repeat(auto-fit, 250px);
`;


interface AppState extends Dictionary<any> {
  languages?: { [key: string]: number }
}

function App() {
  const [github, setGithub] = React.useState<AppState>({});
  const totalCounts = filterTotalCounts(github)
  const labels = R.pathOr<[], Array<LabelInfoProps>>([], ['labels', 'nodes'], github);
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
          R.map(({ color, name, issues, pullRequests }) =>
            <LabelInfo key={name} {...{ color, name, issues, pullRequests }} />
            , labels)
        }
      </Labels>
      <div>
        {
          languages &&
          <LanguagesRadar languages={languages} />
        }
      </div>
    </div>
  );
}

export default App;
