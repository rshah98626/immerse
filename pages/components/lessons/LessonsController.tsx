import React from "react"
import FinishedLessonScreen from "./FinishedLessonScreen"
import { MultipleChoiceComprehension, Option } from "./MultipleChoiceComprehension"
import SpeechLesson from "./SpeechLesson"
import VideoPronunciationLesson from "./VideoPronunciationLesson"


export default function LessonsController() {
  const [index, setIndex] = React.useState(0)
  const incrementIndex = () => setIndex(index + 1)

  
  const englishOptions = [
    {
      text: 'What are you watching?',
      isAnswer: false,
    },
    {
      text: 'What are you eating?',
      isAnswer: true,
    },
    {
      text: 'What are you doing?',
      isAnswer: false,
    }
  ]
  const spanishText = "¿Qué estás comiendo?"

  const indexToLesson = [
    MultipleChoiceComprehension({ incrementIndex, options: englishOptions, unknownText: spanishText }), // spanish to english
    VideoPronunciationLesson({ incrementIndex }),
    SpeechLesson(),
    // MultipleChoiceComprehension({ incrementIndex }), // english to spanish
    FinishedLessonScreen(),
  ]

  return indexToLesson[index]
}

