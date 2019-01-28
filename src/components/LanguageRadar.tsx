import * as React from 'react';
import * as R from 'ramda';
import { Radar } from 'react-chartjs-2';

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
);

export default LanguagesRadar;
