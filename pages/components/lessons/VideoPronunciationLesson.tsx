import { useState } from 'react';
import { Button, Ratio } from 'react-bootstrap';
import { StyleSheet, css } from 'aphrodite'
import { NextButton } from '../common/NextButton';

const styles = StyleSheet.create({
  centeredDiv: {
    display: 'flex',
    justifyContent: 'center',
    margin: "1em",
  },
  moreTopMargin: {
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
      <div className={css(styles.centeredDiv, styles.moreTopMargin)}>
        <NextButton
          incrementIndex={props.incrementIndex}
          disabled={!acknowledged || !videoFinished}
        />
      </div>
    </div>
  )
}