import { Button, Ratio } from 'react-bootstrap';

export default function VideoPronunciationLesson(props: {
  incrementIndex: () => void,
}) {
  return (
    <div>
      <Ratio aspectRatio={"1x1"}>
        <video controls > 
          <source src="/videos/whatAreYouEating.mp4" type="video/mp4" />
        </video>
      </Ratio>
      <h4>¿Qué estás comiendo?</h4>
      <h4>What are you eating?</h4>
      <Button variant='primary' onClick={props.incrementIndex}>Next</Button>
    </div>
  )
}