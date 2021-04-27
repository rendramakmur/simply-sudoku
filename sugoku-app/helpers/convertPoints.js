function convertPoints (timer) {
  let splitTimer = timer.split(':')
  let minutesPoints = Number(splitTimer[0])*100
  let secondsPoints = Number(splitTimer[1])*1

  return minutesPoints + secondsPoints
}

export default convertPoints