import React from 'react';

import SBDeleteIcon from '../../../assets/SBDeleteIcon.svg';
import SBEditIcon from '../../../assets/Edit.svg';
import SBSettingsBuildingIconUnSelected from '../../../assets/SBSettingsBuildingIconUnSelected.svg';
import CustomButton from '../../../components/CustomButton';

const Buildings = ({ levels, handleOpenAddEditBuilding }) => {
  return (
    <>
      <div style={{ width: '100%', height: '100%', marginTop: '3%' }}>
        <div className="user_profile_info">
          <div className="parent_container_header">
            <div className="batments_levels_actions_conatiner d-flex">
              <div className="prnt d-flex batments_levels_container">
                <div> bat</div>
                <div>levels</div>
              </div>
              <div>Action</div>
            </div>
          </div>
          <div
            style={{ background: '#ffffff', borderBottom: '0.2px solid #8C8C8C', color: '#00109E' }}
            className="parent_container_header"
          >
            <div style={{ width: '94%', padding: '1.6% 0%' }} className="batments_levels_actions_conatiner d-flex">
              <div className="d-flex batments_levels_container_edit_delete">
                <div className="d-flex aic building_name_img_container">
                  <img style={{ width: '15px', marginRight: '6%' }} src={SBSettingsBuildingIconUnSelected} />
                  <span className="white_space">Bâtiment Bleu </span>
                </div>
                <div className="levels_container">
                  {levels.map((_) => (
                    <span className="levels" style={{ background: '#D8ECFF' }}>
                      {_?.text}{' '}
                    </span>
                  ))}
                  <span onClick={() => console.log('clicked')} className="add_more_btn">
                    {' '}
                    Add More
                  </span>
                </div>
                <div className="d-flex edit_delete_icon_container aic">
                  <div className="img_round_container">
                    <img onClick={() => handleOpenAddEditBuilding('editbuilding')} src={SBEditIcon} />
                  </div>
                  <div className="img_round_container">
                    <img src={SBDeleteIcon} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CustomButton
        text="Ajouter un bâtiment ➕"
        onClick={() => handleOpenAddEditBuilding('addbuilding')}
        style={{
          position: 'absolute',
          right: '80pt',
          bottom: '80pt',
        }}
      />
    </>
  );
};

export default Buildings;
