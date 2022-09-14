import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import ModalCrossSVG from '../../assets/ModalCross.svg';
import AttachmentSVG from '../../assets/Attachment.svg';

import SelectableTag from '../../components/SelectableTag';
import CustomInput from '../../components/CustomInput';
import Loader from '../../components/Loader';

import Api from '../../api';
import { getUser } from '../../utils/Auth';

import { Store, UpdateStore } from '../../StoreContext';
import { toast } from 'react-toastify';

function AddTicketScreen({ show, handleClose, state, setState, attachment, setAttachment, setCustomAlert }) {
  const user = getUser();
  const store = Store();
  const updateStore = UpdateStore();
  const { t } = useTranslation();

  const [fillLevel, setFillLevel] = useState(0);
  const [categorieslevelscolor, setcategorieslevelscolor] = useState(); ////setting color in state for background of levels categories
  const [Toggler, setToggler] = useState({
    levels: true,
    categories: true,
    Assignes: true,
  }); ////state to toggle show more, show less
  const [showMore, setShowMore] = useState({
    levels: 3,
    categories: 3,
    Assignes: 3,
  });
  ////default tiles show, assignes, categories, levels
  const _setState = (key, value) => {
    const obj = {};
    obj[key] = value;
    setState({
      ...state,
      ...obj,
    });
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    setAttachment(file);
  };

  useEffect(() => {
    let _fillLevel = 0;
    if (state.building) {
      _fillLevel = 1;
    }

    if (state.building && state.building_level) {
      _fillLevel = 2;
    }

    if (state.building && state.building_level && state.category) {
      _fillLevel = 3;
    }

    setFillLevel(_fillLevel);
  }, [state, attachment]);

  useEffect(() => {
    _load();
  }, []);

  const _load = async () => {
    const _buildings = await getBuildings();
    let _buildingLevels = [];
    if (_buildings.length > 0) {
      _buildingLevels = await getBuildingLevels(_buildings[0]);
    }
    const _categories = await getCategories();
    const _assignees = await getAssignees();

    updateStore({
      addTicket: {
        ...store.addTicket,
        buildings: _buildings,
        buildingLevels: _buildingLevels,
        categories: _categories,
        assignees: _assignees,
        isLoading: false,
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

  const getBuildingLevels = async (building) => {
    let response;
    try {
      response = await Api('get', `/levels/dropdown/${building.buildingId}`);
      const _buildingLevels = response.data.data;
      return _buildingLevels;
    } catch (e) {
      console.trace(e);
    }
  };

  const getCategories = async () => {
    let response;
    try {
      response = await Api('get', `/category/dropdown`);
      const _categories = response.data.data;
      return _categories;
    } catch (e) {
      console.trace(e);
    }
  };

  const getAssignees = async () => {
    let response;
    try {
      response = await Api('get', `/Users/getAll/${user.id}`);
      const _assignees = response.data.data;
      return _assignees;
    } catch (e) {
      console.trace(e);
    }
  };

  const selectBuilding = async (_) => {
    const _buildingLevels = await getBuildingLevels(_);
    updateStore({
      addTicket: {
        ...store.addTicket,
        buildingLevels: _buildingLevels,
      },
    });
    setState({
      ...state,
      building: _.buildingId,
      building_level: _buildingLevels[0].value,
    });
  };
  return (
    <>
      {store.addTicket.isLoading ? (
        <div
          className="wh100 column ajc"
          style={{
            display: show ? 'flex' : 'none',
          }}
        >
          <Loader />
        </div>
      ) : (
        <div
          className="column wh100 addticketbgimage"
          style={{
            display: show ? 'flex' : 'none',
            backgroundColor: '#FFFFFF',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          {/* Section 1 */}
          <div
            className="row w100"
            style={{
              margin: '2% 0',
            }}
          >
            <div style={{ flex: 1 }} />
            <div className="row ajc" style={{ flex: 2 }}>
              <p
                style={{
                  fontSize: '22px',
                  fontWeight: '600',
                  color: '#2F696D',
                }}
              >
                Ajouter un nouveau ticket
              </p>
            </div>
            <div className="row aic" style={{ flex: 1, justifyContent: 'flex-end' }}>
              <img
                src={ModalCrossSVG}
                style={{
                  height: '24px',
                  width: '24px',
                  marginRight: '8%',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  handleClose();
                  setCustomAlert(false);
                }}
              />
            </div>
          </div>
          <div style={{ overflow: 'scroll' }} className="row wh100">
            <div
              className="column aic h100"
              style={{
                margin: '0 8%',
              }}
            >
              <div
                className="column ajc"
                style={{
                  height: '40pt',
                  width: '40pt',
                  borderRadius: '50%',
                  backgroundColor: fillLevel > 0 ? '#2F696D' : '#8C8C8C',
                }}
              >
                <p style={{ fontSize: '30', color: '#FFFFFF' }}>1</p>
              </div>
              <div
                style={{
                  height: '15%',
                  width: '2.5pt',
                  backgroundColor: fillLevel > 1 ? '#2F696D' : '#8C8C8C',
                  margin: '5% 0',
                }}
              />
              <div
                className="column ajc"
                style={{
                  height: '40pt',
                  width: '40pt',
                  borderRadius: '50%',
                  backgroundColor: fillLevel > 1 ? '#2F696D' : '#8C8C8C',
                }}
              >
                <p style={{ fontSize: '30', color: '#FFFFFF' }}>2</p>
              </div>
              <div
                style={{
                  height: '35%',
                  width: '2.5pt',
                  backgroundColor: fillLevel > 2 ? '#2F696D' : '#8C8C8C',
                  margin: '5% 0',
                }}
              />
              <div
                className="column ajc"
                style={{
                  height: '40pt',
                  width: '40pt',
                  borderRadius: '50%',
                  backgroundColor: fillLevel > 2 ? '#2F696D' : '#8C8C8C',
                }}
              >
                <p style={{ fontSize: '30', color: '#FFFFFF' }}>3</p>
              </div>
            </div>
            <div className="column wh100">
              <div className="column" style={{ marginBottom: '2%', width: '100%', height: 'auto' }}>
                <p
                  style={{
                    fontSize: '13px',
                    color: '#B7B7B7',
                    paddingBottom: '10pt',
                  }}
                >
                  Bâtiment *
                </p>
                <div style={{ flexWrap: 'wrap', width: '100%' }} className="row">
                  {store.addTicket.buildings.map((_) => (
                    <SelectableTag
                      {..._}
                      text={_.name}
                      isSelected={state.building == _.buildingId}
                      onClick={() => {
                        selectBuilding(_);
                        setShowMore({
                          levels: 3,
                          categories: 3,
                          Assignes: 3,
                        });
                        setcategorieslevelscolor(_?.color);
                      }}
                      categorieslevelscolor={categorieslevelscolor}
                      icon={true}
                      pStyle={{
                        padding: '10pt 6pt',
                        fontWeight: '600',
                      }}
                    />
                  ))}
                </div>
              </div>
              <div className="row w100">
                <div className="column" style={{ marginBottom: '2%' }}>
                  <p
                    style={{
                      fontSize: '13px',
                      color: '#B7B7B7',
                      paddingBottom: '10pt',
                    }}
                  >
                    Lieu
                  </p>
                  <div style={{ flexWrap: 'wrap', width: '406pt' }} className="row aic">
                    {store.addTicket?.buildingLevels?.slice(0, showMore?.levels).map((_) => (
                      <SelectableTag
                        text={_.text}
                        isSelected={state.building_level == _.value}
                        onClick={() => {
                          if (state.building) {
                            _setState('building_level', _.value);
                          } else {
                            toast.error(t('select building first'));
                          }
                        }}
                        pStyle={{
                          padding: '10pt 6pt',
                          fontWeight: '600',
                        }}
                        categorieslevelscolor={categorieslevelscolor}
                      />
                    ))}
                    {store?.addTicket?.buildingLevels?.length > 3 ? (
                      <div
                        style={{
                          whiteSpace: 'nowrap',
                          cursor: 'pointer',
                          fontSize: '13px',
                          color: '#B7B7B7',
                          textDecoration: 'underline',
                        }}
                        onClick={() => {
                          if (store?.addTicket?.buildingLevels?.length > 3) {
                            setShowMore((pre) => {
                              return {
                                ...pre,
                                levels: showMore?.levels > 3 ? 3 : store?.addTicket?.buildingLevels?.length,
                              };
                            });

                            setToggler((pre) => {
                              return {
                                ...pre,
                                levels: !Toggler?.levels,
                              };
                            });
                          }
                        }}
                      >
                        {store?.addTicket?.buildingLevels?.length > 3 ? (Toggler.levels ? t('Show more') : t('Show less')) : ''}
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
                <div className="column w100" style={{ marginBottom: '2%', marginLeft: '5%' }}>
                  <p
                    style={{
                      fontSize: '13px',
                      color: '#B7B7B7',
                      paddingBottom: '10pt',
                    }}
                  >
                    Détails du lieu
                  </p>
                  <CustomInput
                    inputValue={state.location_details ? state.location_details : ''}
                    onChange={(e) => _setState('location_details', e.target.value)}
                    inputPlaceholder="Donne des détails"
                    divStyle={{
                      width: '40%',
                    }}
                    labelStyle={{
                      display: 'none',
                    }}
                    enableYoursStyle={{
                      display: 'none',
                    }}
                    inputStyle={{
                      fontSize: '12px',
                      padding: '8px',
                    }}
                  />
                </div>
              </div>
              {/* Section 2 */}
              <div className="column w100" style={{ marginBottom: '2%' }}>
                <p
                  style={{
                    fontSize: '13px',
                    color: '#B7B7B7',
                    paddingBottom: '10pt',
                  }}
                >
                  Catégorie *
                </p>
                <div style={{ flexWrap: 'wrap' }} className="row w100">
                  {store.addTicket.categories.slice(0, showMore?.categories).map((_) => (
                    <SelectableTag
                      text={_.text}
                      isSelected={state.category == _.value}
                      onClick={() => {
                        if (state.building) {
                          _setState('category', _.value);
                        } else {
                          toast.error(t('select building first'));
                        }
                      }}
                      pStyle={{
                        padding: '10pt 6pt',
                        fontWeight: '600',
                      }}
                      categorieslevelscolor={categorieslevelscolor}
                    />
                  ))}

                  {store.addTicket.categories?.length > 3 ? (
                    <div
                      style={{
                        whiteSpace: 'nowrap',
                        cursor: 'pointer',
                        fontSize: '13px',
                        color: '#B7B7B7',
                        textDecoration: 'underline',
                        marginTop: '1%',
                      }}
                      onClick={() => {
                        if (store?.addTicket?.categories?.length > 3) {
                          setShowMore((pre) => {
                            return {
                              ...pre,
                              categories: showMore?.categories > 3 ? 3 : store?.addTicket?.categories?.length,
                            };
                          });
                          setToggler((pre) => {
                            return {
                              ...pre,
                              categories: !Toggler?.categories,
                            };
                          });
                        }
                      }}
                    >
                      {store?.addTicket?.categories?.length > 3 ? (Toggler.categories ? t('Show more') : t('Show less')) : ''}
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              <div className="column w100" style={{ marginBottom: '2%' }}>
                {/* <p
                  style={{
                    fontSize: "13px",
                    color: "#B7B7B7",
                    paddingBottom: "10pt",
                  }}
                >
                  Titre *
                </p>
                <input
                  value={state.title}
                  onChange={(e) => _setState("title", e.target.value)}
                  style={{
                    fontSize: "12px",
                    width: "25%",
                    padding: "10px",
                    background: "transparent",
                    border: "none",
                    borderBottomColor: "#2F696D",
                    borderBottomStyle: "solid",
                    borderBottomWidth: "1.5px",
                  }}
                /> */}
              </div>
              <div className="row w100" style={{ marginBottom: '2%' }}>
                <div className="column" style={{ marginRight: '2%', width: '40%' }}>
                  <p
                    style={{
                      fontSize: '13px',
                      color: '#B7B7B7',
                      paddingBottom: '10pt',
                    }}
                  >
                    Détails
                  </p>
                  <textarea
                    placeholder="Donnez des information supplémentaires sur votre demande"
                    value={state.details ? state.details : ''}
                    onChange={(e) => _setState('details', e.target.value)}
                    maxLength="200"
                    style={{
                      fontSize: '12px',
                      height: '100pt',
                      width: '100%',
                      padding: '10px',
                      background: 'transparent',
                      borderRadius: '10pt',
                      borderColor: '#8C8C8C',
                      borderStyle: 'solid',
                      borderWidth: '1.5px',
                      maxWidth: '100%',
                      resize: 'none',
                    }}
                  />
                </div>
                <div className="column w100">
                  <p
                    style={{
                      fontSize: '13px',
                      color: '#B7B7B7',
                      paddingBottom: '10pt',
                    }}
                  >
                    {t('Attachment')}
                  </p>
                  <div
                    className="row ajc"
                    style={{
                      backgroundColor: '#F4F4F4',
                      borderRadius: '20pt',
                      padding: '7pt',
                      cursor: 'pointer',
                    }}
                  >
                    <label>
                      <input type="file" accept="*" hidden id="filePicker" name="file" onChange={handleFileSelect} />
                      <div className="row ajc">
                        <img
                          src={AttachmentSVG}
                          style={{
                            height: '16pt',
                            width: '16pt',
                            marginRight: '15pt',
                          }}
                        />
                        <p style={{ fontSize: '11px', fontWeight: 'bold' }}>{`${
                          attachment?.name?.length > 15
                            ? attachment?.name?.slice(0, 15) + '...'
                            : attachment?.name ?? 'Ajouter pièce jointe'
                        }`}</p>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
              {/* Section 3 */}
              <div className="column" style={{ marginBottom: '2%' }}></div>
              {user?.roleSerial == 1 ? (
                <div className="column" style={{ marginBottom: '2%', width: '100%' }}>
                  <p
                    style={{
                      fontSize: '13px',
                      color: '#B7B7B7',
                      paddingBottom: '10pt',
                    }}
                  >
                    Assignés
                  </p>
                  <div style={{ flexWrap: 'wrap', width: '100%' }} className="row">
                    {store.addTicket.assignees.slice(0, showMore?.Assignes).map((_) => (
                      <SelectableTag
                        {..._}
                        image={_.profilePicture}
                        text={`${_.firstName} ${_.lastName}`}
                        isSelected={state.assignee == _.userId}
                        onClick={() => {
                          if (state.building) {
                            _setState('assignee', _.userId);
                          } else {
                            toast.error(t('select building first'));
                          }
                        }}
                        divStyle={{
                          marginRight: '10pt',
                        }}
                        pStyle={{
                          padding: '10pt 6pt',
                          fontWeight: '600',
                        }}
                        categorieslevelscolor={categorieslevelscolor}
                      />
                    ))}
                    {store?.addTicket?.assignees?.length > 3 ? (
                      <div
                        style={{
                          whiteSpace: 'nowrap',
                          cursor: 'pointer',
                          fontSize: '13px',
                          color: '#B7B7B7',
                          textDecoration: 'underline',
                          marginTop: '1%',
                        }}
                        onClick={() => {
                          if (store?.addTicket?.assignees?.length > 3) {
                            setShowMore((pre) => {
                              return {
                                ...pre,
                                Assignes: showMore?.Assignes > 3 ? 3 : store?.addTicket?.assignees?.length,
                              };
                            });

                            setToggler((pre) => {
                              return {
                                ...pre,
                                Assignes: !Toggler?.Assignes,
                              };
                            });
                          }
                        }}
                      >
                        {store?.addTicket?.assignees?.length > 3 ? (Toggler.Assignes ? t('Show more') : t('Show less')) : ''}
                      </div>
                    ) : (
                      <></>
                    )}
                    {/* <div
                      style={{
                        whiteSpace: 'nowrap',
                        cursor: 'pointer',
                        fontSize: '13px',
                        color: '#B7B7B7',
                        textDecoration: 'underline',
                        marginLeft: '10%',
                      }}
                      onClick={()=>setShowMore(store.addTicket.assignees?.length)}
                    >
                      Show more
                    </div> */}
                  </div>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AddTicketScreen;
