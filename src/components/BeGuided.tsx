import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import React, { useState } from 'react';
import { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

const BeGuided = () => {
  const [isHelpModalOpened, setIsHelpModalOpened] = useState<boolean>(true);

  return (
    <div className="beGuided">
      {isHelpModalOpened && (
        <div className="beGuided__carousel">
          <div className="beGuided__carousel__content">
            <Swiper
              pagination={{
                clickable: true,
              }}
              navigation
              loop
              modules={[Navigation, Pagination]}
              className="beGuided__carousel__content__mySwiper">
              <SwiperSlide>
                <h1>Slide 1</h1> <img src="https://picsum.photos/200" alt="randomized" />
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
                  voluptate beatae quo molestiae cumque cupiditate quos reiciendis.
                </p>
              </SwiperSlide>
              <SwiperSlide>
                <h1>Slide 2</h1> <img src="https://picsum.photos/200" alt="randomized" />
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
                  voluptate beatae quo molestiae cumque cupiditate quos reiciendis.
                </p>
              </SwiperSlide>
              <SwiperSlide>
                <h1>Slide 3</h1> <img src="https://picsum.photos/200" alt="randomized" />
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
                  voluptate beatae quo molestiae cumque cupiditate quos reiciendis.
                </p>
              </SwiperSlide>
              <SwiperSlide>
                <h1>Slide 4</h1> <img src="https://picsum.photos/200" alt="randomized" />
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
                  voluptate beatae quo molestiae cumque cupiditate quos reiciendis.
                </p>
              </SwiperSlide>
              <SwiperSlide>
                <h1>Slide 5</h1> <img src="https://picsum.photos/200" alt="randomized" />
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
                  voluptate beatae quo molestiae cumque cupiditate quos reiciendis.
                </p>
              </SwiperSlide>
              <SwiperSlide>
                <h1>Slide 6</h1> <img src="https://picsum.photos/200" alt="randomized" />
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
                  voluptate beatae quo molestiae cumque cupiditate quos reiciendis.
                </p>
              </SwiperSlide>
              <SwiperSlide>
                <h1>Slide 7</h1> <img src="https://picsum.photos/200" alt="randomized" />
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
                  voluptate beatae quo molestiae cumque cupiditate quos reiciendis.
                </p>
              </SwiperSlide>
              <SwiperSlide>
                <h1>Slide 8</h1> <img src="https://picsum.photos/200" alt="randomized" />
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
                  voluptate beatae quo molestiae cumque cupiditate quos reiciendis.
                </p>
              </SwiperSlide>
              <SwiperSlide>
                <h1>Slide 9</h1> <img src="https://picsum.photos/200" alt="randomized" />
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
                  voluptate beatae quo molestiae cumque cupiditate quos reiciendis.
                </p>
              </SwiperSlide>
            </Swiper>
            <button
              type="button"
              onClick={() => {
                setIsHelpModalOpened(false);
              }}>
              SKIP TUTO
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BeGuided;
