import * as React from 'react';
import styled from 'styled-components';
import Color from 'color';

const Label = styled('div') <{
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
const LabelBar = styled('div') <{ backgroundColor: string, width: number }>`
  width: ${({ width }) => width}%;
  background-color: ${({ backgroundColor }) => backgroundColor};
`;

const LabelName = styled('span') <{ color: 'white' | 'black' }>`
  color: ${({ color }) => color};
  font-weight: 600;
`;

const getPercentage = (v1: number, v2: number) => v1 || v2 ? (v1 / (v1 + v2) * 100) : 0;

export interface LabelInfoProps {
  color: string;
  name: string;
  issues: { totalCount: number };
  pullRequests: { totalCount: number };
}

// TODO: handle 0 and 0 case
const LabelInfo: React.SFC<LabelInfoProps> = ({ color, name, issues, pullRequests }) => (
  <Label backgroundColor={color}>
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
);

export default LabelInfo;