import React, { useState } from 'react';
import { Modal } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import { toast } from 'react-toastify';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
const ConfirmationDialog = ({ Open, onClose, headertext, checkboxtext }) => {
  const [checkBoxStatus, setCheckBoxStatus] = useState(true);

  const CloseModal = (status) => {
    onClose(status);
  };
  return (
    <>
      <Modal open={Open}>
        <div
          style={{
            height: '40vh',
            width: '40vw',

            borderRadius: '50px',
          }}
          className="modal_container"
        >
          <div className="circle_container">
            <p className="d-flex confirmation_header_text">{headertext}</p>
            <div>
              <div className="d-flex checkbox_text_container">
                <Checkbox
                  onChange={(e) => setCheckBoxStatus(e.target.checked)}
                  {...label}
                  defaultChecked
                  sx={{
                    color: '#FF5D39',
                    '&.Mui-checked': {
                      color: '#FF5D39',
                    },
                  }}
                />
                <p>{checkboxtext}</p>
              </div>
              <div className="d-flex jcc btn_container">
                <button
                  style={{ background: '#ff5d39', border: 'none', color: '#ffffff' }}
                  className="pointer"
                  onClick={() =>
                    checkBoxStatus
                      ? CloseModal(true)
                      : toast.error('Veuillez Effacer tous les billets et autres détails contre ce bâtiment')
                  }
                >
                  Effacer
                </button>
                <button className="pointer" onClick={() => CloseModal(false)}>
                  Annuler
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ConfirmationDialog;
