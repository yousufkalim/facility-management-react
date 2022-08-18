import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import AllTicketsScreen from './AllTickets';
import AddTicketScreen from './AddTicket';
import CustomAlertCross from '../../components/modals/CustomAlertCross';

import UXL from '../../components/UXL';
import CustomButton from '../../components/CustomButton';
import FooterSVG from '../../assets/Cornerimage.svg';

import * as FormValidations from '../../utils/Validations';
import Api from '../../api';
import { toast } from 'react-toastify';
import { getUser } from '../../utils/Auth';

import { Store, UpdateStore } from '../../StoreContext';

function useWindowSize() {
  const [size, setSize] = useState([window.innerHeight]);
  useEffect(() => {
    const handleResize = () => {
      setSize([window.innerHeight]);
    };
    window.addEventListener('resize', handleResize);
  }, []);
  return size;
}

function DashboardScreen() {
  const { t } = useTranslation();
  const store = Store();
  const updateStore = UpdateStore();
  const user = getUser();
  const [height] = useWindowSize();

  const [renderAddTicket, setRenderAddTicket] = useState(false);
  const [customAlert, setCustomAlert] = useState(false);
  const handleRenderAddTicket = () => {
    if (
      store.addTicket.buildings.length > 0 ||
      user?.roleSerial == 1 ||
      (store.addTicket.buildings.length > 0 && user?.roleSerial == 2)
    ) {
      setRenderAddTicket(!renderAddTicket);
    }
    if (store.addTicket.buildings.length == 0 && user?.roleSerial == 2) {
      setCustomAlert(true);
    }

    // setTimeout(() => {
    //   setCustomAlert(false);
    // }, 2000);
  };

  const [isProcessing, setIsProcessing] = useState(false);

  // Add Ticket State
  const [state, setState] = useState({
    // section 1
    building: '',
    building_level: '',
    location_details: '',

    // section 2
    category: '',
    // title: "",
    details: '',

    // section 3
    // priority: "",
    assignee: '',
  });
  const [attachment, setAttachment] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isProcessing) {
      return;
    }
    if (user?.roleSerial == 1) {
      const isValidated = FormValidations.addTicketadmin(state);
      if (!isValidated) {
        return;
      }
    }
    if (user?.roleSerial == 2) {
      const isValidated = FormValidations.addTicketuser(state);
      if (!isValidated) {
        return;
      }
    }

    let response;

    try {
      setIsProcessing(true);

      const body = new FormData();
      body.append('UserId', user.id); ///////need to be removed in future backend fixing is on
      // body.append('CompanyAdminId', user.id);
      body.append('BuildingId', state.building);
      body.append('PlaceId', state.building_level);
      body.append('LocationDetails', state.location_details);
      body.append('CategoryId', state.category);
      body.append('Details', state.details);
      if (state.assignee) {
        body.append('EmployeeId', state.assignee);
      }
      if (user?.roleSerial == 2) {
        body.append('EmployeeId', user.id);
      }
      body.append('TicketFile', attachment);

      response = await Api('post', '/tickets/save_ticket', body);

      if (response?.data?.success) {
        toast.success('Ticket added successfully.');
        const _recentTickets = await getRecentTickets();
        updateStore({
          allTickets: {
            ...store.allTickets,
            recentTickets: _recentTickets,
          },
        });
        setState({});
        setAttachment('');
        handleRenderAddTicket();
      }
    } catch (e) {
      console.trace(e);
    }

    setIsProcessing(false);
  };

  const getRecentTickets = async () => {
    let response;
    try {
      response = await Api('get', `/tickets/tickets_list/4/${user.id}`);
      const _tickets = response.data.data;
      return _tickets;
    } catch (e) {
      console.trace(e);
    }
  };
  console.log(height, 'height');
  return (
    <>
      {customAlert ? (
        <CustomAlertCross
          setCustomAlert={setCustomAlert}
          renderAddTicket={renderAddTicket}
          setRenderAddTicket={setRenderAddTicket}
          text="l'utilisateur ne peut pas créer de ticket tant que l'administrateur n'a pas attribué de bâtiment à votre profil"
        />
      ) : (
        <> </>
      )}
      <UXL
        appBarText="Dashboard"
        innerMostDivStyle={{
          height: '100%',
        }}
      >
        {/* Needs to have UXL conatiner */}
        <AllTicketsScreen height={height} show={!renderAddTicket} />
        <AddTicketScreen
          show={renderAddTicket}
          handleClose={handleRenderAddTicket}
          state={state}
          setState={setState}
          attachment={attachment}
          setCustomAlert={setCustomAlert}
          setAttachment={setAttachment}
        />
        <CustomButton
          text={`${!renderAddTicket ? 'Ajouter un ticket' : 'Sauvegarder'}`}
          addicon={!renderAddTicket ? true : false}
          checkicon={renderAddTicket ? true : false}
          onClick={!renderAddTicket ? handleRenderAddTicket : (e) => handleSubmit(e)}
          style={{
            position: 'absolute',
            right: '20pt',
            bottom: '20pt',
          }}
        />
      </UXL>
    </>
  );
}

export default DashboardScreen;
