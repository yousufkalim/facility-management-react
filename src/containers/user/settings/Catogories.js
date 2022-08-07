import React, { useState, useEffect, useRef } from 'react';
import ContentEditable from 'react-contenteditable';

import SBDeleteIcon from '../../../assets/SBDeleteIcon.svg';
import SBEditIcon from '../../../assets/Edit.svg';
import CustomButton from '../../../components/CustomButton';

import Loader from '../../../components/Loader';

import { Store, UpdateStore } from '../../../StoreContext';

import ConfirmationDialog from '../../../components/modals/ConfirmationDialog';

import { getUser } from '../../../utils/Auth';

import * as FormValidations from '../../../utils/Validations';
import Api from '../../../api';
import { toast } from 'react-toastify';

const Catogories = () => {
  const store = Store();
  const updateStore = UpdateStore();

  const bottomRef = useRef(null);

  useEffect(() => {
    _load();
  }, []);

  useEffect(() => {
    bottomRef?.current?.scrollIntoView({ behavior: 'smooth' });
  }, [store.settings.allCategories.toAdd]);

  const _load = async () => {
    const _categories = await getCategories();

    updateStore({
      settings: {
        ...store.settings,
        allCategories: {
          categories: _categories,
          isLoading: false,
        },
      },
    });
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

  return (
    <>
      {store.settings.allCategories.isLoading ? (
        <Loader />
      ) : (
        <div className="wh100" style={{ marginTop: '3%' }}>
          <div className="user_profile_info">
            <div style={{ background: '#8C8C8C' }} className="parent_container_header">
              <div style={{ padding: '1% 1%' }} className="batments_levels_actions_conatiner category_actions_container d-flex">
                <div className="prnt d-flex batments_levels_container">
                  <div> Category</div>
                </div>
                <div>Action</div>
              </div>
            </div>
            {store.settings.allCategories.categories.map((_) => (
              <CategoryListTile {..._} />
            ))}
            {store.settings.allCategories.toAdd ? <AddCategory /> : <></>}
            <div ref={bottomRef} />
          </div>
        </div>
      )}
    </>
  );
};

function CategoryListTile(props) {
  const store = Store();
  const updateStore = UpdateStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const [toEdit, setToEdit] = useState(false);
  const [Open, setOpen] = useState(false);
  const text = useRef(props.text);

  useEffect(() => {
    text.current = props.text;
  }, [props.text]);

  const handleChange = (e) => {
    text.current = e.target.value;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isProcessing) {
      return;
    }

    if (!text.current) {
      toast.error("Text can't be empty.");
      return;
    }

    let response;

    try {
      setIsProcessing(true);

      const body = {
        categoryId: parseInt(props.value),
        name: text.current,
      };

      response = await Api('put', '/category', body);

      if (response?.data?.success) {
        const cp = [...store.settings.allCategories.categories];
        const index = cp.map((_) => _.value).indexOf(props.value);
        const obj = {
          ...cp[index],
          text: text.current,
        };
        cp[index] = obj;
        updateStore({
          settings: {
            ...store.settings,
            allCategories: {
              categories: cp,
            },
          },
        });
        setToEdit(false);
      }
    } catch (e) {
      console.trace(e);
    }

    setIsProcessing(false);
  };

  // const handleDelete = async () => {
  //   let response;
  //   try {
  //     response = await Api('delete', `/category/${props.value}`);
  //     if (response.data.success) {
  //       toast.success('Category deleted successfully.');
  //       await _load();
  //     }
  //   } catch (e) {
  //     console.trace(e);
  //   }
  // };
  const handleDelete = async () => {
    setOpen(true);
  };
  const onClose = async (status) => {
    let response;
    if (status) {
      try {
        response = await Api('delete', `/category/${props.value}`);
        if (response.data.success) {
          toast.success('Building deleted successfully.');
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
  const _load = async () => {
    const _categories = await getCategories();

    updateStore({
      settings: {
        ...store.settings,
        allCategories: {
          categories: _categories,
          isLoading: false,
        },
      },
    });
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

  return (
    <div
      style={{
        background: toEdit ? '#FFFBD8' : '#ffffff',
        borderBottom: '0.2px solid #8C8C8C',
        color: '#00109E',
      }}
      className="parent_container_header"
    >
      <ConfirmationDialog setOpen={setOpen} Open={Open} onClose={onClose} />
      <div style={{ width: '94%', padding: '1.2% 0%' }} className="batments_levels_actions_conatiner d-flex">
        <div className="d-flex category_edit_delete_container">
          <div style={{ width: '19%' }} className="d-flex">
            <ContentEditable
              className="category_tile"
              style={{ background: '#F4F4F4' }}
              html={text.current}
              key={`${props.value}`}
              disabled={!toEdit}
              onChange={toEdit ? (e) => handleChange(e) : null}
            />
          </div>
          <div style={{ width: '72%' }} />
          {!toEdit ? (
            <div className="d-flex edit_delete_icon_container aic">
              <div className="img_round_container" style={{ cursor: 'pointer' }} onClick={() => setToEdit(!toEdit)}>
                <img src={SBEditIcon} />
              </div>
              <div className="img_round_container" style={{ cursor: 'pointer' }} onClick={() => handleDelete()}>
                <img src={SBDeleteIcon} />
              </div>
            </div>
          ) : (
            <CustomButton text="Mise à jour" onClick={handleSubmit} />
          )}
        </div>
      </div>
    </div>
  );
}

function AddCategory(props) {
  const store = Store();
  const updateStore = UpdateStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const text = useRef('');

  const handleChange = (e) => {
    text.current = e.target.value;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let userData = getUser();
    if (isProcessing) {
      return;
    }

    if (!text.current) {
      toast.error("Text can't be empty.");
      return;
    }

    let response;

    try {
      setIsProcessing(true);

      const body = {
        name: text.current,
        //employeeId:userData?.userId
      };

      response = await Api('post', '/category', body);

      if (response?.data?.success) {
        await _load();
      }
    } catch (e) {
      console.trace(e);
    }

    setIsProcessing(false);
  };

  const _load = async () => {
    const _categories = await getCategories();

    updateStore({
      settings: {
        ...store.settings,
        allCategories: {
          categories: _categories,
          isLoading: false,
        },
      },
    });
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

  return (
    <div
      style={{
        background: '#FFFBD8',
        borderBottom: '0.2px solid #8C8C8C',
        color: '#00109E',
      }}
      className="parent_container_header"
    >
      <div style={{ width: '94%', padding: '1.2% 0%' }} className="batments_levels_actions_conatiner d-flex">
        <div className="d-flex category_edit_delete_container">
          <div style={{ width: '19%' }} className="d-flex">
            <ContentEditable
              className="category_tile"
              style={{ background: '#F4F4F4' }}
              html={text.current}
              key={`${props.index}`}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div style={{ width: '72%' }} />
          <CustomButton text="Ajouter à la liste" onClick={handleSubmit} />
        </div>
      </div>
    </div>
  );
}

export default Catogories;
