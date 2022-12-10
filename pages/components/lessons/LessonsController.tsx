import React from "react"
import FinishedLessonScreen from "./FinishedLessonScreen"
import MultipleChoiceComprehension from "./MultipleChoiceComprehension"
import SpeechLesson from "./SpeechLesson"
import VideoPronunciationLesson from "./VideoPronunciationLesson"


export default function LessonsController() {
  const [index, setIndex] = React.useState(0)
  const incrementIndex = () => setIndex(index + 1)

  const indexToLesson = [
    VideoPronunciationLesson({ incrementIndex }),
    MultipleChoiceComprehension({ incrementIndex }), // spanish to english
    SpeechLesson(),
    MultipleChoiceComprehension({ incrementIndex }), // english to spanish
    FinishedLessonScreen(),
  ]

  return indexToLesson[index]
}

