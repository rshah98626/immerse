/* eslint-disable react-hooks/exhaustive-deps */
import { useTts } from 'tts-react'
import type { TTSHookProps } from 'tts-react'
import { useCallback, useEffect, useState } from "react";

export const SpeakingComponent = ({ children, onEnd, lang, rate }: TTSHookProps) => {
  const synth = window.speechSynthesis
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  const { ttsChildren } = useTts({ 
    children, 
    autoPlay: true, 
    onEnd: onEnd,
    voice: voices.find((voice: SpeechSynthesisVoice) => voice.lang === lang),
    lang: lang,
    rate: rate,
  })

  const populateVoiceList = useCallback(() => {
    const newVoices = synth.getVoices()
    setVoices(newVoices)
  }, [])

  useEffect(() => {
    populateVoiceList();
    if (synth.onvoiceschanged !== undefined) {
      synth.onvoiceschanged = populateVoiceList;
    }
  }, [populateVoiceList])

  return (
    <>
      {ttsChildren}
    </>
  )
}