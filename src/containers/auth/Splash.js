import React from 'react';

import Spinner from 'react-spinkit';

import LoginBackgroundSVG from '../../assets/BGSplash.png';

import useWindowSize from '../../utils/WindowSize';

function SplashScreen() {
  const [width] = useWindowSize();

  return (
    <div
      className="container"
      style={{
        backgroundImage: 'url(' + LoginBackgroundSVG + ')',
        backgroundSize: 'cover',
        backgroundPosition: 'bottom',
      }}
    >
      <div className="wh100 column ajc">
        <div
          className="column"
          style={{
            marginBottom: '5%',
          }}
        >
          <p
            className="splash_screen_logo_p"
            style={{
              fontSize: width < 667 ? '27px' : '36px',
            }}
          >
            Facility
          </p>
          <span
            className="splash_screen_logo_span"
            style={{
              fontSize: width < 667 ? '20px' : '27px',
              color: '%494949',
            }}
          >
            Management
          </span>
        </div>
        <Spinner name="folding-cube" style={{ height: '30pt', width: '30pt' }} color="#2F696D" />
      </div>
    </div>
  );
}

export default SplashScreen;
