import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import AllTicketsScreen from './AllTickets';
import AddTicketScreen from './AddTicket';

import UXL from '../../components/UXL';
import CustomButton from '../../components/CustomButton';

import * as FormValidations from '../../utils/Validations';
import Api from '../../api';
import { toast } from 'react-toastify';
import { getUser } from '../../utils/Auth';

import { Store, UpdateStore } from '../../StoreContext';

function DashboardScreen() {
  const { t } = useTranslation();
  const store = Store();
  const updateStore = UpdateStore();
  const user = getUser();

  const [renderAddTicket, setRenderAddTicket] = useState(false);
  const handleRenderAddTicket = () => {
    setRenderAddTicket(!renderAddTicket);
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

    const isValidated = FormValidations.addTicket(state);

    if (!isValidated) {
      return;
    }

    if (!attachment) {
      toast.error('Attachment must be selected.');
      return;
    }

    let response;

    try {
      setIsProcessing(true);

      const body = new FormData();

      body.append('CompanyAdminId', user.id);
      body.append('BuildingId', state.building);
      body.append('PlaceId', state.building_level);
      body.append('LocationDetails', state.location_details);
      body.append('CategoryId', state.category);
      // body.append("Title", state.title);
      body.append('Details', state.details);
      // body.append("PriorityId", state.priority);
      if (state.assignee) {
        body.append('EmployeeId', state.assignee);
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

  return (
    <>
      <UXL
        appBarText="Dashboard"
        innerMostDivStyle={{
          height: '100%',
        }}
      >
        {/* Needs to have UXL conatiner */}
        <AllTicketsScreen show={!renderAddTicket} />
        <AddTicketScreen
          show={renderAddTicket}
          handleClose={handleRenderAddTicket}
          state={state}
          setState={setState}
          attachment={attachment}
          setAttachment={setAttachment}
        />
        <CustomButton
          text={`${!renderAddTicket ? 'Ajouter un ticket ➕' : 'Sauvegarder ✔️'}`}
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
