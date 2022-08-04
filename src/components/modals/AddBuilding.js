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
         //employeeId:user?.userId
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
          toast.success('Buidling updated successfully.');
        } else {
          toast.success('Building added successfully.');
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
      <div style={{ padding: '1% 4%' }} className="allusers_modal">
        <div className="modal_parent_container">
          <div style={{ width: '100%' }} className="form_heading_text edit_building_header">
            <span style={{ color: '#2F696D', fontWeight: '600' }}>{`${existingBuilding ? 'Modifier' : 'Add'}`} le bâtiment</span>
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
                width: '100%',
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
              <div className="colors_container d-flex space-between aic">
                {buildingColors.map((_) => (
                  <div
                    style={{ border: color == _ ? '5px solid #2F696D' : 'none', background: _ }}
                    className="colored_circle"
                    onClick={() => {
                      setColor(_);
                    }}
                  >
                    {' '}
                  </div>
                ))}
                <div>
                  <span
                    style={{ color: '#8C8C8C', borderBottom: '0.8px solid #8C8C8C' }}
                    onClick={() => console.log('clicked')}
                    className="load_more_btn"
                  >
                    {' '}
                    Load More
                  </span>{' '}
                </div>
              </div>
              <span className="colors_heading"> Lieu</span>
              <div className="levels_box_container">
                {buildingLevels.map((_) => (
                  <span
                    className="levels"
                    style={{
                      background: levels.includes(_) ? hexToRGBA(color) : '#F4F4F4',
                      color: levels.includes(_) ? color : '#8C8C8C',
                      padding: '2% 2%',
                      cursor: 'pointer',
                    }}
                    onClick={() => handleLevel(_)}
                  >
                    {_}{' '}
                  </span>
                ))}
                <div className="d-flex aic">
                  {' '}
                  <span onClick={() => console.log('clicked')} className="load_more_btn">
                    {' '}
                    Load More
                  </span>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', margin: '2%' }}>
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
