import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

import IPackageItem from '../interfaces/IPackageItem';

interface Props {
  userId: number;
  packageId: number;
}

const FollowedButton = ({ userId, packageId }: Props) => {
  // Set a boolean to handle button suivi/suivre state
  const [isFollowed, setIsFollowed] = useState<boolean>(false);

  // Declaration of 3 variables which changes on click to set styles to Followed button
  const [text, setText] = useState('SUIVRE');
  const [src, setSrc] = useState('/assets/icons/plus.svg');

  // Definition of the function which changes the attributes of the button
  const handleFollowed = () => {
    isFollowed ? setText('SUIVI') : setText('SUIVRE');
    isFollowed ? setSrc('/assets/icons/checked.svg') : setSrc('/assets/icons/plus.svg');
  };

  //toast when a PACKAGE is unfollowed
  const notifyUnfollowed = () =>
    toast.info('Vous ne suivez plus ce package', {
      position: 'bottom-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined,
    });
  //toast when a PACKAGE is Followed
  const notifyFollowed = () =>
    toast.info('Le package a été suivi avec succès !', {
      position: 'bottom-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined,
    });

  // Add a followed article for one user
  const addFollowedPackage = async (e: React.FormEvent<HTMLButtonElement>) => {
    try {
      e.preventDefault();
      await axios.post<IPackageItem>(
        `${import.meta.env.VITE_DB_URL}api/users/${userId}/followedpackages`,
        { idPackage: packageId },
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        },
      );
      setIsFollowed(true);
      handleFollowed();
      notifyFollowed();
    } catch (err) {
      console.error(err);
    }
  };

  // Delete a followed for one user
  const deleteFollowedPackage = async (e: React.FormEvent<HTMLButtonElement>) => {
    try {
      e.preventDefault();
      await axios.delete<IPackageItem>(
        `${import.meta.env.VITE_DB_URL}api/users/${userId}/followedpackages/`,
        { data: { idPackage: packageId } },
      );
      setIsFollowed(false);
      notifyUnfollowed();
      handleFollowed();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {isFollowed && (
        <button
          type="button"
          className={'button button-followed'}
          onClick={(e: React.FormEvent<HTMLButtonElement>) => deleteFollowedPackage(e)}>
          <img src={src} alt={src} />
          {text}
        </button>
      )}
      {!isFollowed && (
        <button
          type="button"
          className="button button-notfollowed"
          onClick={(e: React.FormEvent<HTMLButtonElement>) => addFollowedPackage(e)}>
          <img src={src} alt={src} />
          {text}
        </button>
      )}
    </div>
  );
};

export default FollowedButton;
