import React from 'react';
import "./style.css"
import PortalComponent from '../Overlays';
import { Modal } from 'react-bootstrap';

function Loader({ isLoading }) {

 return (
    <PortalComponent>
      <Modal show={!!isLoading} backdropClassName="custom-backdrop" className='w-100 d-flex flex-column align-self-center custom-modal' dialogClassName="modal-dialog-centered">
        {<div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>}
      </Modal>
    </PortalComponent>
 );
}

export default Loader;
