import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import SBDeleteIcon from '../../../assets/SBDeleteIcon.svg';
import SBEditIcon from '../../../assets/Edit.svg';
import SBSettingsBuildingIconUnSelected from '../../../assets/SBSettingsBuildingIconUnSelected.svg';

import ConfirmationDialog from '../../../components/modals/ConfirmationDialog';
import CustomButton from '../../../components/CustomButton';
import Api from '../../../api';
import { getUser } from '../../../utils/Auth';
import { hexToRGBA } from '../../../utils/Helpers';
import { hexToCSSFilter } from 'hex-to-css-filter';

import { useTranslation } from 'react-i18next';

import { Store, UpdateStore } from '../../../StoreContext';

import Loader from '../../../components/Loader';

const Buildings = (props) => {
  const user = getUser();
  const store = Store();
  const updateStore = UpdateStore();
  useEffect(() => {
    _load();
  }, []);

  const _load = async () => {
    const _buildings = await getBuildings();

    updateStore({
      settings: {
        ...store.settings,
        allBuildings: {
          buildings: _buildings,
          isLoading: false,
        },
      },
    });
  };

  const getBuildings = async () => {
    let response;
    try {
      response = await Api('get', `/buildings/active_building_with_levels`);
      const _buildings = response.data.data;
      return _buildings;
    } catch (e) {
      console.trace(e);
    }
  };

  return (
    <>
      {store.settings.allBuildings.isLoading ? (
        <Loader />
      ) : (
        <div style={{ width: '100%', height: '100%', marginTop: '3%' }}>
          <div className="user_profile_info">
            <div className="parent_container_header">
              <div style={{ background: '#8C8C8C' }} className="batments_levels_actions_conatiner d-flex">
                <div className="prnt d-flex batments_levels_container">
                  <div>Bâtiments</div>
                  <div>Niveaux</div>
                </div>
                <div>Action</div>
              </div>
            </div>
            {store.settings.allBuildings.buildings.map((_) => (
              <BuildingListTile {..._} {...props} />
            ))}
            <CustomButton
              text="Ajouter un bâtiment ➕"
              onClick={() => props?.handleAddBuildingOpen(false)}
              style={{
                position: 'absolute',
                right: '20pt',
                bottom: '20pt',
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

function BuildingListTile(props) {
  const [Open, setOpen] = useState(false);
  const store = Store();
  const { t } = useTranslation();
  const updateStore = UpdateStore();
  const color = props.color ?? '#000000';
  const handleEdit = () => {
    updateStore({
      settings: {
        ...store.settings,
        allBuildings: {
          ...store.settings.allBuildings,
          building: props,
        },
      },
    });
    props.handleAddBuildingOpen(true);
  };

  const handleDelete = async () => {
    setOpen(true);
  };

  const _load = async () => {
    const _buildings = await getBuildings();

    updateStore({
      settings: {
        ...store.settings,
        allBuildings: {
          buildings: _buildings,
          isLoading: false,
        },
      },
    });
  };

  const getBuildings = async () => {
    let response;
    try {
      response = await Api('get', `/buildings/active_building_with_levels`);
      const _buildings = response.data.data;
      return _buildings;
    } catch (e) {
      console.trace(e);
    }
  };
  const onClose = async (status) => {
    let response;
    if (status) {
      try {
        response = await Api('delete', `/buildings/${props.buildingId}`);
        if (response.data.success) {
          toast.success(t('Building deleted successfully.'));
          await _load();
          setOpen(false);
        }
      } catch (e) {
        console.trace(e);
      }
    }
    if (!status) {
      setOpen(false);
    }
  };
  return (
    <div style={{ color: color }} className="parent_container_header">
      <ConfirmationDialog
        checkboxtext="Effacer tous les billets et autres détails contre ce bâtiment"
        headertext="Voulez-vous vraiment supprimer ce bâtiment ?"
        setOpen={setOpen}
        Open={Open}
        onClose={onClose}
      />
      <div style={{ width: '94%', padding: '1.6% 0%' }} className="batments_levels_actions_conatiner d-flex">
        <div className="d-flex batments_levels_container_edit_delete">
          <div style={{ width: '19%' }} className="d-flex aic building_name_img_container">
            <img
              style={{ width: '15px', marginRight: '6%', filter: hexToCSSFilter(color).filter.replace(';', '') }}
              src={SBSettingsBuildingIconUnSelected}
            />
            <span>{props.name}</span>
          </div>
          <div className="levels_container">
            {props.levels.map((_) => (
              <span className="levels" style={{ background: hexToRGBA(color) }}>
                {_.name}{' '}
              </span>
            ))}
            {/* <span onClick={handleEdit} className="add_more_btn">
              {' '}
              Add More
            </span> */}
          </div>
          <div className="d-flex edit_delete_icon_container">
            <div className="img_round_container" style={{ cursor: 'pointer' }} onClick={handleEdit}>
              <img src={SBEditIcon} />
            </div>
            <div className="img_round_container" style={{ cursor: 'pointer' }} onClick={handleDelete}>
              <img src={SBDeleteIcon} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Buildings;
