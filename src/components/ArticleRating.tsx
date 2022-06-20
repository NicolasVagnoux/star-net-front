import Rating from '@mui/material/Rating';
import React, { useState } from 'react';

const ArticleRating = () => {
  const [value, setValue] = useState<number>(1);
  // const [hover, setHover] = useState<number>(0);

  return (
    <div className="rating">
      <h2> Avez-vous aimé cette article ? </h2>
      <Rating
        name="hover-feedback"
        sx={{
          fontSize: '2.3rem',
        }}
        value={value}
        precision={0.5}
        onChange={(event: React.SyntheticEvent<Element, Event>, newValue: any) => {
          setValue(newValue);
        }}
        // onChangeActive={(event, newHover) => {
        //   setHover(newHover);
        // }}
      />
    </div>
  );
};

export default ArticleRating;
