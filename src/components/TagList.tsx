import axios from 'axios';
import React, { useEffect, useState } from 'react';

import IPackageItem from '../interfaces/IPackageItem';
import ITagItem from '../interfaces/ITagItem';
import TagItem from './TagItem';

const TagList = ({ id }: IPackageItem) => {
  // Defining table to gather data from our API call
  const [tagsList, setTagList] = useState<ITagItem[]>();

  // Fonction to get data from our API
  useEffect(() => {
    const getTagsList = async () => {
      axios;
      const url = `${import.meta.env.VITE_DB_URL}api/packages/${id}/categories`;
      const { data } = await axios.get(url);
      setTagList(data);
    };
    getTagsList();
  }, []);

  return (
    <div className="taglist">
      {tagsList && tagsList.map((tags, index) => <TagItem key={index} {...tags} />)}
    </div>
  );
};

export default TagList;
