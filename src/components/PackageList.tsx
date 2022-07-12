import axios from 'axios';
import React, { useEffect, useState } from 'react';

import IPackageItem from '../interfaces/IPackageItem';
import PackageItem from './PackageItem';

interface Props {
  userId: number;
}

const PackageList = ({ userId }: Props) => {
  // Function and API call that enables us to gather all the packages filtered without followed packages
  const [packageItems, setPackageItems] = useState<IPackageItem[]>([]);

  useEffect(() => {
    const getPackageItems = async () => {
      const url = `${import.meta.env.VITE_DB_URL}api/packages`;
      const { data } = await axios.get(url, { withCredentials: true });
      setPackageItems(data);
    };
    getPackageItems();
  }, []);

  // API call to gather all the followed packages by user connected
  const [followedPackageItems, setFollowedPackageItems] = useState<IPackageItem[]>([]);

  useEffect(() => {
    const getFollowedPackageItems = async () => {
      const url = `${import.meta.env.VITE_DB_URL}api/users/${userId}/followedpackages`;
      const { data } = await axios.get(url, { withCredentials: true });
      setFollowedPackageItems(data);
    };
    getFollowedPackageItems();
  }, []);

  return (
    <>
      <h2> Mes packages </h2>
      <div>
        {followedPackageItems &&
          followedPackageItems.map((followedpackageitem) => (
            <PackageItem
              key={followedpackageitem.id}
              {...followedpackageitem}
              userId={userId}
            />
          ))}
      </div>
      <h2> Découvrez de nouveaux packages </h2>
      <div>
        {packageItems &&
          packageItems
            // .filter((packageitem) => !followedIdList?.includes(packageitem.id))
            .map((packageitem) => (
              <PackageItem key={packageitem.id} {...packageitem} userId={userId} />
            ))}
      </div>
    </>
  );
};

export default PackageList;
