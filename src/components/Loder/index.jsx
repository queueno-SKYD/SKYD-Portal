import React from 'react';
import "./style.css"
import PortalComponent from '../Overlays';
import { Modal } from 'react-bootstrap';
import { Box, CircularProgress } from '@mui/material';

function Loader({ isLoading }) {

 return (
    <PortalComponent>
      <Modal show={!!isLoading} backdropClassName="custom-backdrop" className='d-flex align-content-center justify-content-center custom-modal' dialogClassName="modal-dialog-centered">
        {<Box sx={{ display: 'flex' }}>
          <CircularProgress />
        </Box>}
      </Modal>
    </PortalComponent>
 );
}

export default Loader;
