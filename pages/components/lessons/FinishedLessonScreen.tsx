import ConfettiExplosion from 'react-confetti-explosion';

export default function FinishedLessonScreen() {
  return (
    <div style={{height: 500, width: 500}}>
      <h1>Done!</h1>
      <ConfettiExplosion 
        duration={1000000}
      />
    </div>
  )
}