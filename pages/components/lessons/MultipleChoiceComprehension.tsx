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
  const shuffledOptions = shuffleArray(props.options)

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
            />
          </div>
          
        )
      })}
      <Button variant="primary" onClick={props.incrementIndex}>Next</Button>
    </>
  )
}

function MultipleChoiceOption(props: {
  optionText: string,
  isCorrectChoice: boolean,
}) {
  const [wasChosen, setWasChosen] = useState(false)
  const variantOnClick = props.isCorrectChoice ? 'success' : 'danger'

  return (
    <Button 
      variant={!wasChosen ? 'secondary' : variantOnClick}
      onClick={() => setWasChosen(true)}
    >
      {props.optionText}
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