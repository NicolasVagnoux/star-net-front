import React, { useEffect, useState } from 'react';

const FollowedButton = () => {
  // Declaration of 3 variables which changes on click to set styles to Followed button
  const [isFollowed, setIsFollowed] = useState(true);
  const [text, setText] = useState('SUIVRE');
  const [src, setSrc] = useState('../assets/icons/plus.svg');

  // Definition of the function which changes the attributes of the button
  const handleFollowed = () => {
    isFollowed ? setText('SUIVI') : setText('SUIVRE');
    isFollowed
      ? setSrc('../assets/icons/checked.svg')
      : setSrc('../assets/icons/plus.svg');
  };

  // Use effect to control the function call
  useEffect(() => {
    handleFollowed();
  }, [isFollowed]);

  return (
    <div>
      <button
        type="button"
        className={isFollowed ? 'button button-followed' : 'button button-notfollowed'}
        onClick={() => setIsFollowed(!isFollowed)}>
        <img src={src} alt={src} />
        {text}
      </button>
    </div>
  );
};

export default FollowedButton;
