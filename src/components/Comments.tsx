import axios from 'axios';
import React, { useEffect, useState } from 'react';

import IComment from '../interfaces/IComment';

const Comments = () => {
  const [commentList, setCommentList] = useState<IComment[]>([]);

  useEffect(() => {
    const getGuideList = async () => {
      const { data } = await axios.get(`${import.meta.env.VITE_DB_URL}api/comments`);
      setCommentList(data);
    };
    getGuideList();
  }, []);
  console.log(commentList);
  return (
    <div className="messages">
      <label htmlFor="message"> Laissez nous un commentaire</label>
      <textarea
        id="message"
        placeholder="Entrez votre message"
        // required
        rows={8}
      />

      <div></div>
    </div>
  );
};

export default Comments;
