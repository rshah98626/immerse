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
    VideoPronunciationLesson({ incrementIndex }),
    MultipleChoiceComprehension({ incrementIndex, options: englishOptions, unknownText: spanishText, speakingLanguage: 'es-ES' }), // spanish to english
    SpeechLesson({ shownSpanishText: '¿Qué estás __', englishText: 'What are you eating?', incrementIndex, spanishAnswer: spanishText }),
    // MultipleChoiceComprehension({ incrementIndex }), // english to spanish
    FinishedLessonScreen(),
  ]

  return indexToLesson[index]
}

