import { StyleSheet, css } from "aphrodite"
import { useState, useEffect } from "react"
import { Button } from "react-bootstrap"
import { Option } from "../lessons/MultipleChoiceComprehension"

const styles = StyleSheet.create({
  centeredDiv: {
    display: 'flex',
    justifyContent: 'center',
    margin: "1em",
  },
})

export default function MultipleChoiceOptionGenerator(props: {
  shuffledOptions: Option[],
  successCallback: () => void,
  failureCallback: () => void,
  componentWasClicked: () => void,
  shouldDisableButtons: boolean,
}) {
  return (
    <>
      {props.shuffledOptions.map((obj, index) => {
        return (
          <div 
            className={css(styles.centeredDiv)}
            key={index}
          >
            <MultipleChoiceOption
              optionText={obj.text}
              isCorrectChoice={obj.isAnswer}
              successOrFailureAction={obj.isAnswer ? props.successCallback : props.failureCallback}
              componentWasClicked={props.componentWasClicked}
              disabled={props.shouldDisableButtons}
            />
          </div>
        )
      })}
    </>
  )
}

const MultipleChoiceOption = (props: {
  optionText: string,
  isCorrectChoice: boolean,
  successOrFailureAction: () => void,
  componentWasClicked: () => void,
  disabled: boolean,
}) => {
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