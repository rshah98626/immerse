import { useEffect, useState, VoidFunctionComponent } from "react";
import { Button } from "react-bootstrap";
import { StyleSheet, css } from 'aphrodite'
import { useSpeechSynthesis } from 'react-speech-kit'

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

export interface Option {
  text: string;
  isAnswer: boolean;
}

export const MultipleChoiceComprehension = (props: {
  incrementIndex: () => void,
  options: Option[],
  unknownText: string,
}) => {
  const [goToNextLesson, setGoToNextLesson] = useState(false)
  const successCallback = () => setGoToNextLesson(true)

  const [shouldDisableButtons, setShouldDisableButtons] = useState(false)
  const componentWasClicked = () => setShouldDisableButtons(true)

  const [shuffledOptions, setShuffledOptions] = useState(shuffleArray(props.options))
  const failureCallback = () => {
    setShuffledOptions(shuffleArray(props.options))
    setShouldDisableButtons(false)
  }

  const [hasSpoken, setHasSpoken] = useState(false)
  const onEnd = () => {
    console.log("ended speaking")
    setHasSpoken(true)
  }
  const { speak, voices, supported, speaking, cancel} = useSpeechSynthesis({ onEnd });
  const voiceIndex = voices.findIndex((voice: SpeechSynthesisVoice) => voice.lang === 'es-ES')
  // ranges from 0.5 to 2
  const dictationSpeed = 0.75

  useEffect(() => {
    console.log("in use effect for speaking")
    if (!hasSpoken) {
      console.log("turning on speech")
      speak({ text: 'Qué estás comiendo?', voice: voices[voiceIndex], rate: dictationSpeed })
    }
    return () => {
      console.log("cleaning up speaking")
      if (speaking)
        cancel()
    }
  }, [hasSpoken])

  if (!supported)
    return <div>Your browser does not support speech dictation. Please switch browsers.</div>

  return (
    <>
      <div className={css(styles.centeredDiv)}>
        <h2>{props.unknownText}</h2>
      </div>
      {shuffledOptions.map((obj, index) => {
        return (
          <div 
            className={css(styles.centeredDiv)}
            key={index}
          >
            <MultipleChoiceOption
              optionText={obj.text}
              isCorrectChoice={obj.isAnswer}
              successOrFailureAction={obj.isAnswer ? successCallback : failureCallback}
              componentWasClicked={componentWasClicked}
              disabled={shouldDisableButtons}
            />
          </div>
        )
      })}
      <div className={css(styles.centeredDiv)}>
        <Button 
          variant="primary" 
          onClick={props.incrementIndex} 
          style={{ width: "100%" }}
          disabled={!(goToNextLesson && hasSpoken)}
        >
          Next
        </Button>
      </div>
    </>
  )
}

function MultipleChoiceOption(props: {
  optionText: string,
  isCorrectChoice: boolean,
  successOrFailureAction: () => void,
  componentWasClicked: () => void,
  disabled: boolean,
}) {
  const [wasChosen, setWasChosen] = useState(false)

  const variantOnClick = props.isCorrectChoice ? 'success' : 'danger'
  const correlatedEmoji = props.isCorrectChoice ? '✅' : '❌'

  var timer: NodeJS.Timeout | null = null
  const onClickFunc = () => {
    props.componentWasClicked()
    setWasChosen(true)
    if (props.isCorrectChoice)
      props.successOrFailureAction()
    else
      timer = setTimeout(() => {
        setWasChosen(false)
        props.successOrFailureAction()
      }, 500)
  }

  useEffect(() => {
    return () => {
      if (timer !== null)
        clearTimeout(timer)
    }
  }, [timer])

  return (
    <Button 
      variant={!wasChosen ? 'secondary' : variantOnClick}
      onClick={onClickFunc}
      disabled={props.disabled && !wasChosen}
    >
      {wasChosen ? correlatedEmoji + ' ' : ''}{props.optionText}
    </Button>
  )
}

const shuffleArray = (array: Option[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array
}