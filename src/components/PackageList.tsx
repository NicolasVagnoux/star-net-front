import axios from 'axios';
import React, { useEffect, useState } from 'react';

import IPackageItem from '../interfaces/IPackageItem';
import PackageItem from './PackageItem';

interface Props {
  userId: number;
}

const PackageList = ({ userId }: Props) => {
  // Set a flag to handle refresh
  const [refreshListFlag, setRefreshListFlag] = useState<boolean>(false);

  // Function and API call that enables us to gather all the packages filtered without followed packages
  const [packageItems, setPackageItems] = useState<IPackageItem[]>([]);

  useEffect(() => {
    const getPackageItems = async () => {
      const url = `${import.meta.env.VITE_DB_URL}api/users/${userId}/packages`;
      const { data } = await axios.get(url, { withCredentials: true });
      setPackageItems(data);
    };
    getPackageItems();
  }, [refreshListFlag]);

  // API call to gather all the followed packages by user connected
  const [followedPackageItems, setFollowedPackageItems] = useState<IPackageItem[]>([]);

  useEffect(() => {
    const getFollowedPackageItems = async () => {
      const url = `${import.meta.env.VITE_DB_URL}api/users/${userId}/followedpackages`;
      const { data } = await axios.get(url, { withCredentials: true });
      setFollowedPackageItems(data);
    };
    getFollowedPackageItems();
  }, [refreshListFlag]);

  return (
    <div className='packagelist'>
      {followedPackageItems.length > 0 && (
        <div className="packagelist__title">
          <h2> Mes packages </h2>
          <div className="packagelist__title__line"></div>
        </div>
      )}
      <div className="packagelist__followedpackages">
        {followedPackageItems &&
          followedPackageItems.map((followedpackageitem) => (
            <PackageItem
              key={followedpackageitem.id}
              {...followedpackageitem}
              userId={userId}
              setRefreshListFlag={setRefreshListFlag}
              refreshListFlag={refreshListFlag}
            />
          ))}
      </div>
      {packageItems.length > 0 && (
        <div className="packagelist__title">
          <h2> Découvrez de nouveaux packages </h2>
          <div className="packagelist__title__line"></div>
        </div>
      )}
      <div className="packagelist__packagesitems">
        {packageItems &&
          packageItems
            // .filter((packageitem) => !followedIdList?.includes(packageitem.id))
            .map((packageitem, index) => (
              <PackageItem
                key={index}
                {...packageitem}
                userId={userId}
                setRefreshListFlag={setRefreshListFlag}
                refreshListFlag={refreshListFlag}
              />
            ))}
      </div>
    </div>
  );
};

export default PackageList;
