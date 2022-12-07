import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAnglesRight, faXmark } from '@fortawesome/free-solid-svg-icons'
import LessonsController from './LessonsController';

export default function LessonsModal(props: {
  onHide: () => void,
  show: boolean,
}) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <div className="container">
          <div className='row'>
            <div className='col-md-4'>
              <div className='d-flex flex-row'>
                  <div className='p-2' onClick={props.onHide}>
                    <FontAwesomeIcon icon={faXmark} size={"lg"}/>
                  </div>
              </div>
            </div>
            <div className='col-md-4 offset-md-4'>
              <div className='d-flex flex-row-reverse'>
                <div className='p-2'>
                  <FontAwesomeIcon icon={faAnglesRight} size={"lg"} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal.Header>
      <Modal.Body>
        <LessonsController />
      </Modal.Body>
    </Modal>
  );
}