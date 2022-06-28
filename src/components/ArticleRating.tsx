import Rating from '@mui/material/Rating';
import axios from 'axios';
import React, { useState } from 'react';

const ArticleRating = () => {
  const [rating, setRating] = useState<number>(1);
  const [text, setText] = useState<string>("");
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
    e.preventDefault();
    console.log(rating, text);
    await axios.post<IComment>(`http://localhost:3000/api/comments`, {})
    } catch (err:any) {
      console.log(err.response);
    }
  };

  return (
    <div className="comment">
      <h2> Avez-vous aimé cette article ? </h2>
      <form
        className="comment__form"
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          handleSubmit(e);
        }}>
        <Rating
          name="hover-feedback"
          sx={{
            fontSize: '2.3rem',
          }}
          value={rating}
          precision={0.5}
          onChange={(event: React.SyntheticEvent<Element, Event>, newValue: any) => {
            setRating(newValue);
          }}
        />
          <input
            type="text"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
            className="comment__form__text"
            placeholder="Commentaire(facultatif)"
            id="comment"
          />
        <input className="comment__form__submit" type="submit" value="Soumettre" />
      </form>
    </div>
  );
};

export default ArticleRating;
