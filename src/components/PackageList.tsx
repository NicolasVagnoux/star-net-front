import axios from 'axios';
import React, { useEffect, useState } from 'react';

import IPackageItem from '../interfaces/IPackageItem';
import PackageItem from './PackageItem';

const PackageList = () => {
  // Function and API call that enables us to gather all the packages
  const [packageItems, setPackageItems] = useState<IPackageItem[]>([]);

  useEffect(() => {
    const getPackageItems = async () => {
      const url = `${import.meta.env.VITE_DB_URL}api/packages`;
      const { data } = await axios.get(url, { withCredentials: true });
      setPackageItems(data);
    };
    getPackageItems();
  }, []);

  return (
    <div>
      {packageItems &&
        packageItems.map((packageitem) => (
          <PackageItem key={packageitem.id} {...packageitem} />
        ))}
    </div>
  );
};

export default PackageList;
