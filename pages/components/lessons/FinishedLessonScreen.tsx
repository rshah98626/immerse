import Confetti from "react-confetti";
import { useState, useRef, useEffect } from "react";
import { Container } from "react-bootstrap";

export default function FinishedLessonScreen() {
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const [showConfetti, setShowConfetti] = useState(true);
  const confetiRef: React.Ref<HTMLInputElement> = useRef(null);

  useEffect(() => {
    if (confetiRef.current !== null) {
      setHeight(confetiRef.current.clientHeight);
      setWidth(confetiRef.current.clientWidth);
    }
  }, []);

  return (
    <Container style={{ minHeight: '50vh'}} ref={confetiRef} className={"d-flex flex-column justify-content-center align-items-center"}>
      {showConfetti && 
        <Confetti 
          numberOfPieces={500} width={width} height={height} onConfettiComplete={() => setShowConfetti(false)}
          recycle={false}
        />
      }
      <h1>Done with lesson!</h1>
    </Container>
  )
}