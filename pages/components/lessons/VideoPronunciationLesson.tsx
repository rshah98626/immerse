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
      <div style={{ display: 'flex', justifyContent: 'center', margin: "1em" }}>
        <h4>¿Qué <span style={{ color: '#0083ff' }}>estás</span> comiendo?</h4>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', margin: "1em" }}>
        <h4>What are you eating?</h4>
      </div>
      <Button variant='primary' onClick={props.incrementIndex}>Next</Button>
    </div>
  )
}