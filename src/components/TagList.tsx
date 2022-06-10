import React, { useEffect, useState } from 'react';
import TagItem from './TagItem';
import ITagItem from '../interfaces/ITagItem';
import axios from 'axios';

const TagList = () => {
  // Defining table to gather data from our API call
  const [tagsList, setTagList] = useState<ITagItem[]>();

  // Fonction to get data from our API
  useEffect(() => {
    const getTagsList = async () => {
      axios;
      const url = `http://localhost:3000/api/packages/1/categories`;
      const { data } = await axios.get(url);
      setTagList(data);
    };
    getTagsList();
  }, []);

  return <div>
    {tagsList &&
          tagsList.map((tags, index) => <TagItem key={index} {...tags} />)}
  </div>;
};

export default TagList;
