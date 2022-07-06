import React from 'react';

import ITagItemArticle from '../interfaces/ITagItemArticle';

const TagItemArticle = ({ name }: ITagItemArticle) => {
  return <div className="tagitemarticle">{name}</div>;
};

export default TagItemArticle;
