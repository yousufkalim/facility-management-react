import React, { useState, useEffect } from 'react';

import CustomInput from '../CustomInput';

import { useTranslation } from 'react-i18next';

import { buildingColors, buildingLevels } from '../../utils/Constants';

import * as FormValidations from '../../utils/Validations';
import Api from '../../api';
import { toast } from 'react-toastify';
import { getUser } from '../../utils/Auth';
import { hexToRGBA } from '../../utils/Helpers';

import { Store, UpdateStore } from '../../StoreContext';

const AddBuilding = ({ cb, handleClose }) => {
  const { t } = useTranslation();
  const user = getUser();
  const store = Store();
  const updateStore = UpdateStore();

  const existingBuilding = store.settings.allBuildings.building;

  const [isProcessing, setIsProcessing] = useState(false);

  const [title, setTitle] = useState('');
  const [color, setColor] = useState(buildingColors[0]);
  const [levels, setLevels] = useState([]);
  const [showMoreColors, setShowMoreBuildingColors] = useState(6); ////show more functionality for building colors
  const [showMoreBuildingLevels, setshowMoreBuildingLevels] = useState(12);
  useEffect(() => {
    if (existingBuilding) {
      const _color = existingBuilding.color[0] == '#' ? existingBuilding.color : `${existingBuilding.color}`;
      setTitle(existingBuilding.name);
      setColor(_color);
      setLevels(existingBuilding.levels.map((_) => _.name));
    }
  }, []);

  const handleLevel = (level) => {
    const _levels = [...levels];
    if (_levels.includes(level)) {
      _levels.splice(_levels.indexOf(level), 1);
    } else {
      _levels.push(level);
    }
    setLevels(_levels);
  };

  const _getParsedLevels = () => {
    let _parsedLevels = [];
    if (existingBuilding) {
      _parsedLevels = [...existingBuilding.levels];
      const existingBuildingLevelNamesArr = existingBuilding.levels.map((_) => _.name);

      // Find newly added buildings
      for (let i = 0; i < buildingLevels.length; i++) {
        const _buildingLevel = buildingLevels[i];
        if (!existingBuildingLevelNamesArr.includes(_buildingLevel) && levels.includes(_buildingLevel)) {
          const index = levels.indexOf(_buildingLevel);
          _parsedLevels.push({
            name: levels[index],
            isNew: true,
          });
        }
      }

      // Find removed buildings
      for (let i = 0; i < buildingLevels.length; i++) {
        const _buildingLevel = buildingLevels[i];
        if (existingBuildingLevelNamesArr.includes(_buildingLevel) && !levels.includes(_buildingLevel)) {
          const index = existingBuildingLevelNamesArr.indexOf(_buildingLevel);
          _parsedLevels[index] = {
            ..._parsedLevels[index],
            isDelete: true,
          };
        }
      }
    } else {
      for (let i = 0; i < levels.length; i++) {
        const obj = {
          name: levels[i],
        };
        _parsedLevels.push(obj);
      }
    }
    return _parsedLevels;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isProcessing) {
      return;
    }

    const isValidated = FormValidations.addBuilding({
      title,
      color,
      levels,
    });

    if (!isValidated) {
      return;
    }

    let response;

    try {
      setIsProcessing(true);
      const _parsedLevels = _getParsedLevels();
      const body = {
        name: title,
        color: color,
        buildingLevels: _parsedLevels,
        employeeId: user?.userId,
      };

      if (existingBuilding) {
        body['buildingId'] = existingBuilding.buildingId;
      }

      if (existingBuilding) {
        response = await Api('put', '/buildings', body);
      } else {
        response = await Api('post', '/buildings', body);
      }

      if (response?.data?.success) {
        if (existingBuilding) {
          toast.success(t('Buidling updated successfully.'));
        } else {
          toast.success(t('Building added successfully.'));
        }
        cb();
        handleClose();
      }
    } catch (e) {
      console.trace(e);
    }

    setIsProcessing(false);
  };

  return (
    <>
      <div style={{ padding: '2% 4% 1% 4%' }} className="allusers_modal">
        <div className="modal_parent_container">
          <div style={{ width: '100%' }} className="form_heading_text edit_building_header">
            <span style={{ color: '#2F696D', fontWeight: '600' }}>
              {`${existingBuilding ? 'Modifier' : 'Ajouter'}`} le bâtiment
            </span>
            <span style={{ color: '#8C8C8C' }}>Cela s'affichera lorsque vous ajouterez de nouveaux tickets ou utilisateurs</span>
            <div className="horizental_seperator" />
            <CustomInput
              ptext="Nom du bâtiment"
              inputType="text"
              inputName="Bâtiment"
              inputPlaceholder="Bâtiment"
              inputValue={title}
              enableYoursStyle={{
                fontWeight: '400',
                fontSize: '14px',
                lineHeight: '21px',
                color: '#8C8C8C',
                marginBottom: '0px',
              }}
              divStyle={{
                width: '72%',
              }}
              inputStyle={{
                border: ' 2px solid #8C8C8C',
                borderRadius: '20px',
              }}
              labelStyle={{
                marginBottom: '8px',
              }}
              onChange={(e) => setTitle(e.target.value)}
            />
            <div className="colors_btn_container">
              <span className="colors_heading"> Couleur du bâtiment</span>
              <div style={{ flexWrap: 'wrap', marginLeft: '3%' }} className="colors_container d-flex aic">
                {buildingColors.slice(0, showMoreColors).map((_) => (
                  <div
                    style={{
                      border: color == _ ? '5px solid #2F696D' : 'none',
                      background: _,
                    }}
                    className="colored_circle"
                    onClick={() => {
                      setColor(_);
                    }}
                  >
                    {' '}
                  </div>
                ))}
                <div
                  style={{ marginLeft: '3%' }}
                  onClick={() => {
                    if (buildingColors.length > 6) {
                      setShowMoreBuildingColors(buildingColors?.length);
                    }
                  }}
                >
                  <span
                    style={{
                      color: '#8C8C8C',
                      borderBottom: '0.8px solid #8C8C8C',
                    }}
                    onClick={() => console.log('clicked')}
                    className="load_more_btn"
                  >
                    {' '}
                    Voir plus
                  </span>{' '}
                </div>
              </div>
              <span className="colors_heading"> Lieu</span>
              <div style={{ marginTop: '2%', marginLeft: '3%' }} className="levels_box_container">
                {buildingLevels.slice(0, showMoreBuildingLevels).map((_) => (
                  <span
                    className="levels"
                    style={{
                      background: levels.includes(_) ? hexToRGBA(color) : '#F4F4F4',
                      color: levels.includes(_) ? color : '#8C8C8C',
                      padding: '2.5% 4%',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                    }}
                    onClick={() => handleLevel(_)}
                  >
                    {_}{' '}
                  </span>
                ))}
                <div
                  style={{ marginLeft: '3%' }}
                  onClick={() => {
                    if (buildingLevels.length > 6) {
                      setshowMoreBuildingLevels(buildingLevels?.length);
                    }
                  }}
                  className="d-flex aic"
                >
                  {' '}
                  <span onClick={() => console.log('clicked')} className="load_more_btn">
                    {' '}
                    Voir plus
                  </span>
                </div>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginTop: '8%',
                }}
              >
                <button onClick={handleClose} className="btn_all_user">
                  {t('Jeter')}
                </button>
                <button className="btn_all_user" onClick={handleSubmit}>
                  {t('Sauvegarder ☑️')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddBuilding;
