import { useState } from "react";
import { StyleSheet, css } from 'aphrodite'
import { SpeakingComponent } from "../misc/SpeakingComponent";
import MultipleChoiceOptionGenerator from "../misc/MultipleChoiceOptionGenerator";
import { NextButton } from "../common/NextButton";

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
  speakingLanguage: string,
}) => {
  const [goToNextLesson, setGoToNextLesson] = useState(false)
  const [shuffledOptions, setShuffledOptions] = useState(shuffleArray(props.options))
  const [hasSpoken, setHasSpoken] = useState(false)

  const [shouldDisableButtons, setShouldDisableButtons] = useState(false)
  const componentWasClicked = () => setShouldDisableButtons(true)

  const successCallback = () => setGoToNextLesson(true)
  const failureCallback = () => {
    setShuffledOptions(shuffleArray(props.options))
    setShouldDisableButtons(false)
  }

  return (
    <>
      <div className={css(styles.centeredDiv)}>
        <SpeakingComponent 
          onEnd={(_: SpeechSynthesisEvent | Event) => setHasSpoken(true)}
          lang={props.speakingLanguage}
          rate={0.75}
        >
          <h2>{props.unknownText}</h2>
        </SpeakingComponent>
      </div>
      <MultipleChoiceOptionGenerator
        shuffledOptions={shuffledOptions}
        successCallback={successCallback}
        failureCallback={failureCallback}
        componentWasClicked={componentWasClicked}
        shouldDisableButtons={shouldDisableButtons}
      />
      <div className={css(styles.centeredDiv)}>
        <NextButton 
          incrementIndex={props.incrementIndex}
          disabled={!(goToNextLesson && hasSpoken)}
        />
      </div>
    </>
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