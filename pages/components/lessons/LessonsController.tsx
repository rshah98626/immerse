import React from "react"
import FinishedLessonScreen from "./FinishedLessonScreen"
import { MultipleChoiceComprehension } from "./MultipleChoiceComprehension"
import { SpeechLesson } from "./SpeechLesson"
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
    SpeechLesson({ spanishText: '¿Qué estás', englishText: 'What are you eating?' }),
    VideoPronunciationLesson({ incrementIndex }),
    MultipleChoiceComprehension({ incrementIndex, options: englishOptions, unknownText: spanishText, speakingLanguage: 'es-ES' }), // spanish to english
    // MultipleChoiceComprehension({ incrementIndex }), // english to spanish
    FinishedLessonScreen(),
  ]

  return indexToLesson[index]
}

