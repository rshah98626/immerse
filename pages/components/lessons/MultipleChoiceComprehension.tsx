import { Button } from "react-bootstrap";

export default function MultipleChoiceComprehension(props: {
  incrementIndex: () => void,
}) {
  return (
    <>
      <h4>¿Qué estás comiendo?</h4>
      <p>What are you watching?</p>
      <p>What are you eating?</p>
      <p>What are you doing?</p>
      <Button variant="primary" onClick={props.incrementIndex}>Next</Button>
    </>
  )
}