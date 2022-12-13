import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition"
import { Button } from "react-bootstrap";

export default function SpeechLesson() {
  // const { speak, voices, supported, speaking } = useSpeechSynthesis();
  // const voiceIndex = voices.findIndex((voice: SpeechSynthesisVoice) => voice.lang === 'es-ES')
  // ranges from 0.5 to 2
  const dictationSpeed = 0.75

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <div>Your browser does not support speech recognition. Please switch browsers.</div>
  }

  // if (!supported) {
  //   return <div>Your browser does not support speech dictation. Please switch browsers.</div>
  // }

  if (!isMicrophoneAvailable) {
    return <div>Enable access to your microphone to complete this lesson.</div>
  }

  return (
    <div>
      <div>
        {/* <Button
          variant="primary"
          onClick={() => speak({ text: '¿Qué estás comiendo?', voice: voices[voiceIndex], rate: dictationSpeed })}
        >
          Click to speak
        </Button> */}
        <Button 
          variant="primary" 
          onClick={() => SpeechRecognition.startListening({ language: 'es-US' })}
        >
          Start listening
        </Button>
      </div>
      <div>
        <Button 
          variant="danger"
          onClick={() => SpeechRecognition.stopListening()}
        >
          Stop listening
        </Button>
      </div>
      <div>
        <h6>This is the transcript: {transcript}</h6>
      </div>
    </div>
  )
}