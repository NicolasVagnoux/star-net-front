import React from 'react';
import ITagItem from '../interfaces/ITagItem';

const TagItem = ({ name }: ITagItem) => {
  return <div className="tag">{name}</div>;
};
export default TagItem;
