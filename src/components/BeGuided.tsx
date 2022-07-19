import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import IGuide from '../interfaces/IGuide';

interface Props {
  redirectHome: () => void;
}

const BeGuided = ({ redirectHome }: Props) => {
  const [guideList, setGuideList] = useState<IGuide[]>([]);

  useEffect(() => {
    const getGuideList = async () => {
      const { data } = await axios.get(`${import.meta.env.VITE_DB_URL}api/guide`);
      setGuideList(data);
    };
    getGuideList();
  }, []);
  console.log(guideList);

  return (
    <div className="beGuided">
      <div className="beGuided__carousel">
        <div className="beGuided__carousel__content">
          <Swiper
            pagination={{
              clickable: true,
            }}
            navigation
            modules={[Navigation, Pagination]}
            className="beGuided__carousel__content__mySwiper"
          >
            {guideList &&
              guideList.map((guide) => (
                <SwiperSlide key={guide.id}>
                  <h1>{guide.title}</h1> <img src={guide.mainPicture} alt="guideImage" />
                  <p>{guide.description}</p>
                </SwiperSlide>
              ))}
          </Swiper>
          <button
            className="beGuided__carousel__content__button"
            type="button"
            onClick={() => {
              redirectHome();
            }}
          >
            ACCEDER AU SITE
          </button>
        </div>
      </div>
    </div>
  );
};

export default BeGuided;
