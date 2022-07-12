import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import IPackageItem from '../interfaces/IPackageItem';

interface Props {
  userId: number;
  packageId: number;
  setIsFollowed: React.Dispatch<React.SetStateAction<boolean>>;
  isFollowed:boolean;
}

const FollowedButton = ({ userId, packageId, setIsFollowed, isFollowed }: Props) => {

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
        `${import.meta.env.VITE_DB_URL}api/users/${userId}/followedpackages/${packageId}`,
      );
      setIsFollowed(false);
      notifyUnfollowed();
    } catch (err) {
      console.log(err);
    }
  };

  // Check if the followed button should be follow or unfollow
  useEffect(() => {
  const getFollowedOrNot = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_DB_URL}api/users/${userId}/followedpackages/${packageId}`,
      { withCredentials: true },
    );
    console.log(data);
    data ? setIsFollowed(true) : setIsFollowed(false);
  };
  getFollowedOrNot();
},[isFollowed]);


  return (
    <div>
      {isFollowed && (
        <button
          type="button"
          className="button button-notfollowed"
          onClick={(e: React.FormEvent<HTMLButtonElement>) => deleteFollowedPackage(e)}>
          <img src='/assets/icons/plus.svg' alt="unfollow" />
          SUIVI
        </button>
      )}
      {!isFollowed && (
        <button
          type="button"
          className="button button-followed"
          onClick={(e: React.FormEvent<HTMLButtonElement>) => addFollowedPackage(e)}>
          <img src="/assets/icons/checked.svg" alt="follow" />
          SUIVRE
        </button>
      )}
    </div>
  );
};

export default FollowedButton;
