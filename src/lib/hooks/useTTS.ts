'use client'

import { useState, useRef, useCallback, useEffect } from 'react'

export function useTTS() {
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])

  useEffect(() => {
    const loadVoices = () => {
      const available = window.speechSynthesis.getVoices()
      if (available.length > 0) setVoices(available)
    }
    loadVoices()
    window.speechSynthesis.onvoiceschanged = loadVoices
  }, [])

  const getBestVoice = useCallback(() => {
    const preferred = [
      'Google US English',
      'Microsoft Aria Online (Natural)',
      'Microsoft Jenny Online (Natural)',
      'Microsoft Guy Online (Natural)',
      'Microsoft Zira',
      'Microsoft David',
      'Samantha',
    ]
    for (const name of preferred) {
      const match = voices.find(v => v.name === name)
      if (match) return match
    }
    return voices.find(v => v.lang.startsWith('en')) ?? voices[0] ?? null
  }, [voices])

  const speak = useCallback((text: string) => {
    if (!window.speechSynthesis) return
    window.speechSynthesis.cancel()

    const utterance = new SpeechSynthesisUtterance(text)
    const bestVoice = getBestVoice()
    if (bestVoice) utterance.voice = bestVoice

    utterance.rate = 0.95
    utterance.pitch = 1
    utterance.volume = 1

    utterance.onstart = () => setIsSpeaking(true)
    utterance.onend = () => setIsSpeaking(false)
    utterance.onerror = () => setIsSpeaking(false)

    window.speechSynthesis.speak(utterance)
  }, [getBestVoice])

  const stop = useCallback(() => {
    window.speechSynthesis.cancel()
    setIsSpeaking(false)
  }, [])

  return { speak, stop, isSpeaking }
}