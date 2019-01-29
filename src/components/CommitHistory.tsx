import * as React from 'react';
import { Line } from 'react-chartjs-2';
import Card from './Card';

interface CommitHistoryProps {
  commitLabels: string[];
  additions: number[];
  deletions: number[];
  changedFiles: number[];
}

const CommitHistory: React.SFC<CommitHistoryProps> = ({ commitLabels, additions, deletions, changedFiles }) => (
  <Card>
    <Line
      data={{
        labels: commitLabels,
        datasets: [
          {
            label: 'Additions',
            data: additions,
            backgroundColor: 'transparent',
            borderColor: '#2cbe4e',
          },
          {
            label: 'Deletions',
            data: deletions,
            backgroundColor: 'transparent',
            borderColor: "#cb2431",
          },
          {
            label: 'Changed Files',
            data: changedFiles,
            backgroundColor: 'transparent',
            borderColor: '#0366d6',
          },
        ]
      }}
    />
  </Card>
);

export default CommitHistory;