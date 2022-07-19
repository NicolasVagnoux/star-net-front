import 'react-toastify/dist/ReactToastify.css';

import Rating from '@mui/material/Rating';
import axios from 'axios';
// import jwt_decode from 'jwt-decode';
import React, { useContext, useState } from 'react';
// import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';

// import IUser from '../interfaces/IUser';
import CurrentUserContext from '../contexts/CurrentUser';
import ICompletedArticle from '../interfaces/ICompletedArticle';

// To collect the idArticle related to the comment, I created this interface
interface Props {
  id: number;
  setIsCompleted: React.Dispatch<React.SetStateAction<boolean>>;
}

const ArticleRating = ({ id, setIsCompleted }: Props) => {
  const [rating, setRating] = useState<number>(1);

  // Collect the userId (the one connected) with the cookie
  // const cookie = useCookies(['user_token'])[0];
  // const user: IUser = jwt_decode(cookie.user_token); -> Old version with token
  const { userId } = useContext(CurrentUserContext);

  // Notify success ratings
  const notifySuccess = () =>
    toast.info("L'article a bien été validé. Merci pour votre retour !", {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined,
    });

  // Sending/Posting inputs to the database
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      await axios.post<ICompletedArticle>(
        `${import.meta.env.VITE_DB_URL}api/users/${userId}/completedArticles`,
        {
          // This is the body
          rating: rating,
          idArticle: id,
        },
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        },
      );
      setIsCompleted(true);
      notifySuccess();
    } catch (err: any) {
      console.log(err.response);
    }
  };

  return (
    <div className="comment">
      <h2> Avez-vous aimé cet article ? </h2>
      <form
        className="comment__form"
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          handleSubmit(e);
        }}
      >
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
        {/* <input
          type="text"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
          className="comment__form__text"
          placeholder="Commentaire(facultatif)"
          id="comment"
        /> */}
        <input
          className="comment__form__submit"
          type="submit"
          value="Valider l'article"
        />
      </form>
    </div>
  );
};

export default ArticleRating;
