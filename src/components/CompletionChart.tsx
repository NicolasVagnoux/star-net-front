import 'react-circular-progressbar/dist/styles.css';

import React from 'react';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';

const CompletionChart = () => {
  const value = 66;

  return (
    <div className="completionchart">
      <CircularProgressbar
        value={value}
        text={`${value}%`}
        strokeWidth={15}
        // background
        backgroundPadding={10}
        styles={buildStyles({
          // backgroundColor: '#3e98c7',
          textColor: '#primaryBlack',
          textSize: '30px',
          pathColor: '#secondaryColor5',
          trailColor: '#secondaryColor2',
        })}
      />
    </div>
  );
};

export default CompletionChart;
