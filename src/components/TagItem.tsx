import React from 'react';
import ITagItem from '../interfaces/ITagItem';

const TagItem = ({text}:ITagItem) => {
  return (
    <div className='tag'>
      {text}
    </div>
  );
};
export default TagItem;
