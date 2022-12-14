import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition"
import { Button } from "react-bootstrap"
import { StyleSheet, css } from 'aphrodite'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMicrophone } from '@fortawesome/free-solid-svg-icons'
import Image from "next/image"
import audioWave from '../../../public/icons8-audio-wave.gif'

const styles = StyleSheet.create({
  centeredDiv: {
    display: 'flex',
    justifyContent: 'center',
    margin: "1em",
  },
  roundedCorners: {
    borderRadius: "5rem"
  },
  moreTopMargin: {
    marginTop: "2em"
  },
  blueText: {
    color: '#2876ce'
  }
})

export const SpeechLesson = (props: {
  spanishText: string,
  englishText: string,
}) => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <div>Your browser does not support speech recognition. Please switch browsers.</div>
  }

  if (!isMicrophoneAvailable) {
    return <div>Enable access to your microphone to complete this lesson.</div>
  }

  return (
    <div>
      <div className={css(styles.centeredDiv)}>
        <h2>{props.spanishText}</h2>
      </div>
      <div className={css(styles.centeredDiv)}>
        <h6>{props.englishText}</h6>
      </div>
      <div className={css(styles.centeredDiv)}>
        <h3 className={css(styles.blueText)}>{transcript}</h3>
      </div>
      <div className={css(styles.centeredDiv)}>
        <Image src={audioWave} alt="soundWaves"/>
      </div>
      <div className={css(styles.centeredDiv, styles.moreTopMargin)}>
        <Button 
          className={css(styles.roundedCorners)}
          onClick={() => SpeechRecognition.startListening({ language: 'es-ES' })}
        >
          <FontAwesomeIcon icon={faMicrophone}/> Say in Spanish
        </Button>
      </div>
    </div>

    // <div>
    //   <div>
    //     <Button 
    //       variant="primary" 
    //       onClick={() => SpeechRecognition.startListening({ language: 'es-US' })}
    //     >
    //       Start listening
    //     </Button>
    //   </div>
    //   <div>
    //     <Button 
    //       variant="danger"
    //       onClick={() => SpeechRecognition.stopListening()}
    //     >
    //       Stop listening
    //     </Button>
    //   </div>
    //   <div>
    //     <h6>This is the transcript: {transcript}</h6>
    //   </div>
    // </div>
  )
}