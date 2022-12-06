import React from "react";
import Button from 'react-bootstrap/Button';
import LessonsModal from "../lessons/LessonsModal";


export default function StartPage() {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <div className="d-flex flex-column min-vh-100 justify-content-center align-items-center">
        <h1>Immerse</h1>
        <p>A new way to learn languages</p>
        <Button 
          variant="primary"
          onClick={() => setModalShow(true)}
        >
          Get Started
        </Button>
        <LessonsModal 
          onHide={() => setModalShow(false)}
          show={modalShow}
        />
    </div>
  )
}