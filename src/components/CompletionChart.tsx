import 'react-circular-progressbar/dist/styles.css';

import React from 'react';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';

const CompletionChart = () => {
  const value = 50;

  return (
    <div className="completionchart">
      <CircularProgressbar
        value={value}
        text={`${value}%`}
        strokeWidth={15}
        background
        backgroundPadding={1}
        styles={buildStyles({
          backgroundColor: 'white',
          textColor: 'black',
          textSize: '30px',
          pathColor: '#6a8eae',
          trailColor: '#6a8eae50',
          strokeLinecap: 'butt',
        })}
      />
    </div>
  );
};

export default CompletionChart;
