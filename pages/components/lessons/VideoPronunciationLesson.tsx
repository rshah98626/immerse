import { useState } from 'react';
import { Button, Ratio } from 'react-bootstrap';
import { StyleSheet, css } from 'aphrodite'

const styles = StyleSheet.create({
  centeredDiv: {
    display: 'flex',
    justifyContent: 'center',
    margin: "1em",
  },
  moreeTopMargin: {
    marginTop: "2em"
  }
})

export default function VideoPronunciationLesson(props: {
  incrementIndex: () => void,
}) {
  const [acknowledged, setAcknowledged] = useState(false)
  const [videoFinished, setVideoFinished] = useState(false)

  return (
    <div>
      <Ratio aspectRatio={"1x1"}>
        <video autoPlay onEnded={() => { setVideoFinished(true) }} loop={false}> 
          <source src="/videos/whatAreYouEating.mp4" type="video/mp4" />
        </video>
      </Ratio>
      <div className={css(styles.centeredDiv)}>
        <h4>¿Qué <span style={{ color: '#0083ff' }}>estás</span> comiendo?</h4>
      </div>
      <div className={css(styles.centeredDiv)}>
        <Button 
          variant={acknowledged ? 'success': 'secondary'}
          onClick={() => setAcknowledged(true)}
        > 
          {acknowledged ? '✅' : ''} What are you eating?
        </Button>
      </div>
      <div className={css(styles.centeredDiv, styles.moreeTopMargin)}>
        <Button 
          className="btn-block mr-1 mt-1 btn-lg" 
          variant='primary' 
          onClick={props.incrementIndex} 
          disabled={!acknowledged || !videoFinished}
          style={{ width: "100%" }}
        >
          Next
        </Button>
      </div>
    </div>
  )
}