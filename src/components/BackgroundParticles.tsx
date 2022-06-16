import React from 'react';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';

const BackgroundParticles = () => {
  const particlesInit = async (main: any): Promise<any> => {
    console.log(main);
    await loadFull(main);
  };

  const particlesLoaded = (container: any): any => {
    console.log(container);
  };

  return (
    <div>
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          fullScreen: {
            enable: true,
            zIndex: -10,
          },
          background: {
            color: {
              value: '#f6f6ff',
            },
          },
          fpsLimit: 90,
          interactivity: {
            events: {
              onClick: {
                enable: false,
              },
              onHover: {
                enable: false,
              },
              resize: true,
            },
          },
          particles: {
            color: {
              value: ['#6a8eae', '#8d9ec6'],
            },
            links: {
              color: '#a6a6f3',
              distance: 170,
              enable: true,
              opacity: 0.7,
              width: 1,
            },
            collisions: {
              enable: true,
            },
            move: {
              direction: 'none',
              enable: true,
              outModes: {
                default: 'bounce',
              },
              random: false,
              speed: 1,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 120,
            },
            opacity: {
              value: 0.9,
            },
            shape: {
              type: 'circle',
            },
            size: {
              value: { min: 1, max: 4 },
            },
          },
          detectRetina: true,
        }}
      />
    </div>
  );
};

export default BackgroundParticles;
