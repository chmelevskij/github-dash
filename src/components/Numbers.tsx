import * as React from 'react';
import styled from 'styled-components';
import * as R from 'ramda';

import NumberBadge from './NumberBadge';

export const NumbersContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, 170px);
  grid-gap: 1rem;
  justify-content: center;
`;

interface NumbersProps {
  totalCounts: any;
}

const Numbers: React.SFC<NumbersProps> = ({ totalCounts }) => (
<NumbersContainer>
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
</NumbersContainer>);

export default Numbers;