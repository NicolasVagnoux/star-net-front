import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ITagItemArticle from '../interfaces/ITagItemArticle';
import TagItemArticle from './TagItemArticle';

// interface props
interface Props {
  id: number;
}

const TagListArticle = ({ id }: Props) => {
  // Defining table articlesCategories to gather data from API
  const [tagsListArticle, setTagListArticle] = useState<ITagItemArticle[]>();

  // Function to get data from our API
  useEffect(() => {
    const getTagsListArticle = async () => {
      axios;
      const url = `http://localhost:3000/api/articles/${id}/categories`;
      const { data } = await axios.get(url);
      setTagListArticle(data);
    };
    getTagsListArticle();
  }, []);

  return (
    <div className="taglistarticle">
      {tagsListArticle &&
        tagsListArticle.map((tags, index) => <TagItemArticle key={index} {...tags} />)}
    </div>
  );
};

export default TagListArticle;
