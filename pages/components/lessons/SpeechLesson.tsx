import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition"
import { Button } from "react-bootstrap"
import { StyleSheet, css } from 'aphrodite'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMicrophone } from '@fortawesome/free-solid-svg-icons'
import Image from "next/image"
import audioWave from '../../../public/icons8-audio-wave.gif'
import { useState } from "react"
import { NextButton } from "../common/NextButton"

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
  },
  tenPercentSquare: {
    width: '10%',
    height: '10%',
  }
})

export const SpeechLesson = (props: {
  shownSpanishText: string,
  spanishAnswer: string,
  englishText: string,
  incrementIndex: () => void,
}) => {
  const [textMatches, setTextMatches] = useState(false)
  const commands = [
    {
      command: props.spanishAnswer,
      callback: (_command: any, _spokenPhrase: any, similarityRatio: any) => {
        console.log(`Similarity ratio: ${similarityRatio}`)
        setTextMatches(true)
      },
      isFuzzyMatch: true,
      fuzzyMatchingThreshold: 0.7,
    }
  ]
  const {
    transcript,
    listening,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable
  } = useSpeechRecognition({ commands });

  if (!browserSupportsSpeechRecognition) {
    return <div>Your browser does not support speech recognition. Please switch browsers.</div>
  }

  if (!isMicrophoneAvailable) {
    return <div>Enable access to your microphone to complete this lesson.</div>
  }

  return (
    <div>
      <div className={css(styles.centeredDiv)}>
        <h2>{props.shownSpanishText}</h2>
      </div>
      <div className={css(styles.centeredDiv)}>
        <h6>{props.englishText}</h6>
      </div>
      <TranscriptText transcript={transcript} />
      <SoundWavesAnimation listening={listening} />
      <div className={css(styles.centeredDiv, styles.moreTopMargin)}>
        <Button 
          className={css(styles.roundedCorners)}
          onClick={() => SpeechRecognition.startListening({ language: 'es-ES' })}
          disabled={textMatches}
        >
          <FontAwesomeIcon icon={faMicrophone}/> Say in Spanish
        </Button>
      </div>
      <Button 
        className="btn-block mr-1 mt-1 btn-lg"
        variant="light"
        style={{ width: "100%", background: "#f4f5f8" }}
        onClick={props.incrementIndex}
      >Skip</Button>
      <NextButton 
        incrementIndex={props.incrementIndex}
        disabled={!textMatches}
      />
    </div>
  )
}

const TranscriptText = (props: { transcript: string }) => {
  return props.transcript !== '' ? (
    <div className={css(styles.centeredDiv)}>
      <h3 className={css(styles.blueText)}>{props.transcript}</h3>
    </div>
  ) : <></>
}

const SoundWavesAnimation = (props: { listening: boolean }) => {
  return props.listening ? (
    <div className={css(styles.centeredDiv)}>
      <Image 
        className={css(styles.tenPercentSquare)} 
        src={audioWave} 
        alt="soundWaves"
      />
    </div>
  ) : <></>
}