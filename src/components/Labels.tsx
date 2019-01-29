import * as React from 'react';
import * as R from 'ramda';
import styled from 'styled-components';
import { NumbersContainer } from './Numbers';
import LabelInfo from './LabelInfo';

const LabelsContainer = styled(NumbersContainer)`
  grid-template-columns: repeat(auto-fit, 250px);
`;

interface LabelsProps {
  labels: any[];
}

const Labels: React.SFC<LabelsProps> = ({ labels }) => (
  <LabelsContainer>
    {
      R.map(({ color, name, issues, pullRequests }) =>
        <LabelInfo key={name} {...{ color, name, issues, pullRequests }} />
        , labels)
    }
  </LabelsContainer>);

export default Labels;