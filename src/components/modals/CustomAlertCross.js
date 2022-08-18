import React, { useState } from 'react';
import { Modal } from '@mui/material';
import Cross from '../../assets/Cross.svg';
import CrossAlert from '../../assets/CrossAlert.svg';

const CustomAlertCross = ({ text, onClose, setRenderAddTicket, renderAddTicket, setCustomAlert }) => {
  const [open, setOpen] = useState(true);
  return (
    <>
      <Modal
        open={open}
        // onClose={() => {
        //   setOpen(false);
        //   //onClose();
        // }}
      >
        <div
          style={{
            height: '206px',
            width: '338px',
            background: '#494949',
            borderRadius: '30px',
          }}
          className="modal_container"
        >
          <div className="img_container pointer">
            <img
              onClick={() => {
                setOpen(false);
                setCustomAlert(false);
              }}
              src={CrossAlert}
            />
          </div>

          <div className="circle_container_cross">
            <div id="outer_circle_cross">
              <div id="inner_circle_cross">
                <img
                  src={Cross}
                  className="done_icon_cross"
                  style={{
                    position: 'absolute',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '35%',
                    width: '55%',
                    left: '22%',
                    color: '#2F696D',
                    top: '35%',
                  }}
                />
              </div>
            </div>
            <div className="alert_box_text_cross" style={{ fontSize: '14px' }}>
              {text}
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CustomAlertCross;
