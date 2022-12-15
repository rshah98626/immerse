import { Button } from "react-bootstrap";

export const NextButton = (props: {
  disabled: boolean,
  incrementIndex: () => void
}) => {
  return <Button 
    className="btn-block mr-1 mt-1 btn-lg" 
    variant='primary' 
    onClick={props.incrementIndex} 
    disabled={props.disabled}
    style={{ width: "100%" }}
  >
    Next
  </Button>
}