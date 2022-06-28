import Rating from '@mui/material/Rating';
import axios from 'axios';
import React, { useState } from 'react';
import IComment from '../interfaces/IComment';
import jwt_decode from 'jwt-decode';
import IUser from '../interfaces/IUser';
import { useCookies } from 'react-cookie';

// To collect the idArticle related to the comment, I created this interface
interface Props {
  id:number;
}

const ArticleRating = ({id}: Props) => {
  const [rating, setRating] = useState<number>(1);
  const [text, setText] = useState<string>('');

  
  // Collect the userId (the one connected) with the cookie
  const [cookie, setCookie, removeCookie] = useCookies(['user_token']);
  const user: IUser = jwt_decode(cookie.user_token);

  // Sending/Posting inputs to the database 
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      console.log(rating, text);
      await axios.post<IComment>(`http://localhost:3000/api/users/${user.id}/comments`, {
        text: text,
        rating: rating,
        idArticle: id,
      }, {
        method: "POST", 
        headers: {'Content-Type': 'application/json'}, 
        withCredentials: true,
      });
    } catch (err: any) {
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
