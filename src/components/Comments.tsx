import axios from 'axios';
import React, { useEffect, useState } from 'react';

import IComment from '../interfaces/IComment';
import CommentBox from './CommentBox';
interface Props {
  idArticle: number;
}
const comments = ({ idArticle }: Props) => {
  const [commentsList, setCommentsList] = useState<IComment[]>([]);

  useEffect(() => {
    const getGuideList = async () => {
      const url = `${import.meta.env.VITE_DB_URL}api/articles/${idArticle}/comments`;
      const { data } = await axios.get(url);

      setCommentsList(data);
    };
    getGuideList();
  }, []);

  return (
    <div className="messages">
      <label htmlFor="message">Laissez nous un commentaire</label>
      <textarea
        id="message"
        placeholder="Entrez votre message"
        // required
        rows={8}
      />
      {commentsList &&
        commentsList.map((comments) => <CommentBox key={comments.id} {...comments} />)}
    </div>
  );
};

export default comments;
