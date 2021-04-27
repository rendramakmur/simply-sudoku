import { useState, useEffect } from 'react'


export default function useTimer (duration, start) {
  const [countDown, setCountDown] = useState('')

  let timer = duration
  let minutes;
  let seconds;

  useEffect(() => {
    if (start === true) {
      const interval = setInterval(function () {
        minutes = Math.floor(timer / 60);
        seconds = Math.floor(timer % 60);
  
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        
        
        if (--timer < -1) {
          timer = duration;
        } else if (timer === -1) {
          clearInterval(interval)
        }
        
        setCountDown(`${minutes}:${seconds}`)
  
      }, 1000);
      return () => {
        clearInterval(interval)
      }
    }
  }, [duration, start])

  return countDown
}