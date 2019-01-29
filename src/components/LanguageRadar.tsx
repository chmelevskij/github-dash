import * as React from 'react';
import * as R from 'ramda';
import { Radar } from 'react-chartjs-2';

interface Sizable {
  size: number;
}

const LanguagesRadar: React.SFC<{ languages: any }> = ({ languages }) => (
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
      labels: R.map(R.path(['node', 'name']))(languages.edges) as string[],
      datasets: [{
        data: R.map(
          R.pipe(
            R.prop<Sizable, 'size'>('size'),
            R.divide(R.__, 100),
          ),
        )(languages.edges),
        backgroundColor: 'hsla(2, 86%, 45%, 0.2)',
        borderColor: 'hsla(2, 86%, 45%, 0.6)',
        pointBackgroundColor: R.map(R.path(['node', 'color']))(languages.edges) as string[],
        pointRadius: 5,
      }],
    }}
  />
);

export default LanguagesRadar;
