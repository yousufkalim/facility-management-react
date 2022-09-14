import React, { useState, useEffect } from 'react';

import { styled } from '@mui/material/styles';
import AppBarHamburgerSVG from '../assets/AppBarHamburger.svg';
import AppLogoSVG from '../assets/AppLogo.svg';
import SearchSVG from '../assets/AppBarSearch.svg';
import DummyUserSVG from '../assets/DummyUser.jpeg';
import SignOutIcon from '../assets/SignOut.svg';

import GTranslateIcon from '@mui/icons-material/GTranslate';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { getUser } from '../utils/Auth';
import { Store, UpdateStore } from '../StoreContext';

import { handleLogout } from '../utils/Auth';

const StyledMenu = styled((MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...MenuProps}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 12,
    marginTop: theme.spacing(3),
    padding: '2% 2% 1% 2%',
    minWidth: 230,
    color: theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow: '0px 4px 20px rgba(160, 160, 160, 0.33)',

    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
    },
  },
}));

function AppBar({ color, sticky = true, text, disableSearch = true, divStyle }) {
  const { t, i18n } = useTranslation();
  const { language } = i18n;

  const navigate = useNavigate();

  const store = Store();
  const updateStore = UpdateStore();
  //
  const [anchorElProfile, setAnchorElProfile] = React.useState(null);
  const openProfile = Boolean(anchorElProfile);
  const user = getUser();
  const handleClickProfile = (event) => {
    setAnchorElProfile(event.currentTarget);
  };
  const handleCloseProfile = () => {
    setAnchorElProfile(null);
  };
  //
  useEffect(() => {
    updateStore({
      ...store,
      userDetails: {
        firstName: user?.firstName,
        lastName: user?.lastName,
      },
    });
  }, []);
  //
  const [searchQuery, setSearchQuery] = useState('');

  const hamburgerCallback = () => {
    updateStore({
      isSideBar: !store.isSideBar,
    });
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  console.log(store, 'store');
  return (
    <div
      className="appbar_container"
      style={{
        backgroundColor: color ?? '#F4F4F4',
        position: sticky ? 'fixed' : 'inherit',
        ...divStyle,
      }}
    >
      <div className="appbar_top">
        <div className="appbar_row1" onClick={hamburgerCallback}>
          <img
            src={AppBarHamburgerSVG}
            className="appbar_row1_img"
            style={{
              maxWidth: '3vh',
              width: '3vh',
              marginRight: '6vh',
            }}
          />
          <img src={AppLogoSVG} className="appbar_row1_img" />
        </div>
        <div className="appbar_row2">
          {text ? (
            <p
              style={{
                fontSize: '18px',
                fontWeight: '600',
                color: '#44787B',
              }}
            >
              {text}
            </p>
          ) : (
            <></>
          )}
        </div>
        <div className="appbar_row3">
          {!disableSearch ? <SearchInput setSearchQuery={setSearchQuery} /> : <></>}
          <span
            className="appbar_row3_user_img ip_container"
            style={{
              fontSize: '18px',
              fontWeight: '600',
              color: '#44787B',
              whiteSpace: 'nowrap',
            }}
            onClick={handleClickProfile}
          >
            {store?.userDetails?.firstName + ' ' + store?.userDetails?.lastName}
          </span>
          <StyledMenu
            id="demo-customized-menu"
            MenuListProps={{
              'aria-labelledby': 'demo-customized-button',
            }}
            anchorEl={anchorElProfile}
            open={openProfile}
            onClose={handleCloseProfile}
          >
            {/* <MenuItem className="menu-item support-padding" onClick={() => changeLanguage(`${language == 'en' ? 'fr' : 'en'}`)}>
              <GTranslateIcon sx={{ width: '20px' }} />
              {language == 'fr' ? 'French' : 'English'}
            </MenuItem> */}
            <MenuItem className="menu-item sign-out-padding" onClick={() => handleLogout(navigate, updateStore)}>
              <img style={{ width: '16px' }} src={SignOutIcon} /> <p> {t('Sign out')} </p>
            </MenuItem>
          </StyledMenu>
        </div>
      </div>
    </div>
  );
}

function SearchInput({ setSearchQuery, callback }) {
  const { t } = useTranslation();
  return (
    <div>
      <div
        style={{
          position: 'relative',
          height: '100%',
          width: '100%',
        }}
      >
        <input
          type="text"
          placeholder={t('Search')}
          className="appbar_row3_input"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <img src={SearchSVG} className="appbar_row3_search_img" onClick={callback} />
      </div>
    </div>
  );
}

export default AppBar;
