import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAnglesRight, faXmark } from '@fortawesome/free-solid-svg-icons'

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
        <h4>Centered Modal</h4>
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}