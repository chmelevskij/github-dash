import * as React from 'react';
import styled from 'styled-components';

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

export default NumberBadge;