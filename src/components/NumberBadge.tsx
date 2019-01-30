import * as React from 'react';
import styled from 'styled-components';
import Card from './Card';

interface NumberBadgeProps {
  number: number;
  title?: string;
  emoji?: string;
}

const BadgeNumber = styled.div`
  font-size: 1.5rem;
  font-weight: 200;
`;

const BadgeTitle = styled.div`
  opacity: 0.5;
`;

const NumberCard = styled(Card)`
  width: 100%;
`;
const NumberBadge: React.SFC<NumberBadgeProps> = ({ title, number }) => (
  <NumberCard>
    <BadgeNumber>{number}</BadgeNumber>
    <BadgeTitle>{title}</BadgeTitle>
  </NumberCard>
);

export default NumberBadge;