import { useState } from "react";
import { Button } from "react-bootstrap";
import { StyleSheet, css } from 'aphrodite'

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

export default function MultipleChoiceComprehension(props: {
  incrementIndex: () => void,
  options: Option[],
  unknownText: string,
}) {
  const [goToNextLesson, setGoToNextLesson] = useState(false)
  const successCallback = () => setGoToNextLesson(true)

  const [shuffledOptions, setShuffledOptions] = useState(shuffleArray(props.options))
  const failureCallback = () => setShuffledOptions(shuffleArray(props.options))

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
              onClickCallback={obj.isAnswer ? successCallback : failureCallback}
            />
          </div>
          
        )
      })}
      <div className={css(styles.centeredDiv)}>
        <Button 
          variant="primary" 
          onClick={props.incrementIndex} 
          style={{ width: "100%" }}
          disabled={!goToNextLesson}
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
  onClickCallback: () => void
}) {
  const [wasChosen, setWasChosen] = useState(false)

  const variantOnClick = props.isCorrectChoice ? 'success' : 'danger'
  const correlatedEmoji = props.isCorrectChoice ? '✅' : '❌'

  var timer: NodeJS.Timeout | null = null
  const onClickFunc = () => {
    setWasChosen(true)
    if (props.isCorrectChoice)
      props.onClickCallback()
    else
      timer = setTimeout(() => {
        setWasChosen(false)
        props.onClickCallback()
      }, 1000)
  }

  return (
    <Button 
      variant={!wasChosen ? 'secondary' : variantOnClick}
      onClick={onClickFunc}
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