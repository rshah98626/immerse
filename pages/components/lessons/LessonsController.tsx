import React from "react"
import FinishedLessonScreen from "./FinishedLessonScreen"
import MultipleChoiceComprehension from "./MultipleChoiceComprehension"
import VideoPronunciationLesson from "./VideoPronunciationLesson"


export default function LessonsController() {
  const [index, setIndex] = React.useState(0)
  const incrementIndex = () => setIndex(index + 1)

  const indexToLesson = [
    FinishedLessonScreen(),
    VideoPronunciationLesson({ incrementIndex }),
    MultipleChoiceComprehension({ incrementIndex }),
  ]

  return indexToLesson[index]
}

