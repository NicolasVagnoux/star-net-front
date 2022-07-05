import 'react-circular-progressbar/dist/styles.css';

import React from 'react';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';

interface Props {
  value: number
}

const CompletionChart = ({ value } : Props) => {

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
