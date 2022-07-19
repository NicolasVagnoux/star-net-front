import axios from 'axios';
// import jwt_decode from 'jwt-decode';
import { debounce } from 'lodash';
import React, { useEffect, useState } from 'react';
// import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';

import IArticle from '../interfaces/IArticle';
import IPackageItem from '../interfaces/IPackageItem';
// import IUser from '../interfaces/IUser';
import ArticleList from './ArticleList';
import CompletionChart from './CompletionChart';
import TagList from './TagList';

// interface props
interface Props {
  id: number;
  name: string;
  description: string;
  userId: number;
  setRefreshListFlag: React.Dispatch<React.SetStateAction<boolean>>;
  refreshListFlag: boolean;
}

const PackageItem = ({
  name,
  id: packageId,
  description,
  userId,
  setRefreshListFlag,
  refreshListFlag,
}: Props) => {
  // We Collect the userId (the one connected) with the cookie
  // const cookie = useCookies(['user_token'])[0];
  // const user: IUser = jwt_decode(cookie.user_token); -> Old version with token

  // Set a boolean to handle button suivi/suivre state
  const [isFollowed, setIsFollowed] = useState<boolean>(false);

  // Function and API call to get articlesList lenght and display it to users
  const [articleList, setArticleList] = useState<IArticle[]>([]);
  const [completion, setCompletion] = useState<number | any>(0);
  useEffect(() => {
    const getArticleList = async () => {
      // Function to get all articles in the package
      const articleListResponse = await axios.get<IArticle[]>(
        `${import.meta.env.VITE_DB_URL}api/packages/${packageId}/articles`,
        { withCredentials: true },
      );
      setArticleList(articleListResponse.data);

      // Function and API call to get completedArticleLenght
      const completedArticlesResponse = await axios.get(
        `${
          import.meta.env.VITE_DB_URL
        }api/users/${userId}/packages/${packageId}/completedArticles`,
        { withCredentials: true },
      );

      setCompletion(
        Math.round(
          (completedArticlesResponse.data.length / articleListResponse.data.length) * 100,
        ),
      );
    };
    getArticleList();
  }, []);

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
      setRefreshListFlag(!refreshListFlag);
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
      setRefreshListFlag(!refreshListFlag);
      notifyUnfollowed();
    } catch (err) {
      console.log(err);
    }
  };

  // Debounce package to prevent multiple click
  const deleteFollowedPackageDebounce = debounce(deleteFollowedPackage, 300);
  const addFollowedPackageDebounce = debounce(addFollowedPackage, 300);

  // Check and update if the followed button state (followed or unfollowed) for all package items
  const getFollowedOrNot = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_DB_URL}api/users/${userId}/followedpackages/${packageId}`,
      { withCredentials: true },
    );
    console.log(data);
    data ? setIsFollowed(true) : setIsFollowed(false);
  };

  useEffect(() => {
    getFollowedOrNot();
  }, []);

  return (
    <div className="packageitem">
      <div className="packageitem__container">
        <CompletionChart value={completion} />
        <div className="packageitem__container__title">
          <h2 className="packageitem__container__title__main">
            {name} <span> ({articleList.length} articles) </span>
          </h2>
          <div className="packageitem__container__title__button">
            {isFollowed && (
              <button
                type="button"
                className="button button-followed"
                onClick={(e: React.FormEvent<HTMLButtonElement>) =>
                  deleteFollowedPackageDebounce(e)
                }>
                <img src="/assets/icons/checked.svg" alt="unfollow" />
              </button>
            )}
            {!isFollowed && (
              <button
                type="button"
                className="button button-notfollowed"
                onClick={(e: React.FormEvent<HTMLButtonElement>) =>
                  addFollowedPackageDebounce(e)
                }>
                <img src="/assets/icons/plus.svg" alt="follow" />
                SUIVRE
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="packageitem__taglist">
        <TagList id={packageId} name={name} description={description} />
      </div>
      <ArticleList id={packageId} />
    </div>
  );
};

export default PackageItem;
