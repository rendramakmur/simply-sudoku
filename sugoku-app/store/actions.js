export function fetchBoards (payload) {
  return { type: 'boards/fetchBoards', payload }
}

export function fetchTemplateBoards (payload) {
  return { type: 'templateBoards/setTemplateBoards', payload }
}

export function fetchBoardsAsync () {
  return (dispatch) => {
    dispatch(setIsLoading(true))
    fetch('https://sugoku.herokuapp.com/board')
      .then(res => res.json())
      .then(data => {
        dispatch(fetchBoards(data.board))
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        dispatch(setIsLoading(false))
      })
  }
}

export function fetchBoardsDifficultyAsync (difficulty) {
  return (dispatch) => {
    dispatch(setIsLoading(true))
    fetch(`https://sugoku.herokuapp.com/board?difficulty=${difficulty}`)
      .then(res => res.json())
      .then(data => {
        dispatch(fetchBoards(data.board))
        dispatch(fetchTemplateBoards(data.board))
        dispatch(changeValueBoards(data.board))
        dispatch(setStartTimer(true))
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        dispatch(setIsLoading(false))
      })
  }
}

export function setStartTimer(payload) {
  return { type: 'startTimer/setStartTimer', payload }
}

export function validateBoards (payload) {
  return { type: 'validate/validateBoards', payload }
}

export function validateBoardsAsync () {
  return (dispatch, getState) => {
    const { editedBoards } = getState().boardReducer
    let data = {board: editedBoards}

    const encodeBoard = (board) => board.reduce((result, row, i) => result + `%5B${encodeURIComponent(row)}%5D${i === board.length -1 ? '' : '%2C'}`, '')

    const encodeParams = (params) => 
      Object.keys(params)
      .map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
      .join('&');
    dispatch(setValidateLoading(true))
    fetch('https://sugoku.herokuapp.com/validate', {
      method: 'POST',
      body: encodeParams(data),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
      .then(res => res.json())
      .then(data => {
        dispatch(validateBoards(data.status))
        alert(`The result is ${data.status}`)
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        dispatch(setValidateLoading(false))
      })
  }
}

export function solveBoardsAsync () {
  return (dispatch, getState) => {
    const { templateBoards } = getState().boardReducer
    let data = {board: templateBoards}

    const encodeBoard = (board) => board.reduce((result, row, i) => result + `%5B${encodeURIComponent(row)}%5D${i === board.length -1 ? '' : '%2C'}`, '')

    const encodeParams = (params) => 
      Object.keys(params)
      .map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
      .join('&');

    dispatch(setSolveLoading(true))
    fetch('https://sugoku.herokuapp.com/solve', {
      method: 'POST',
      body: encodeParams(data),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
      .then(res => res.json())
      .then(data => {
        dispatch(fetchBoards(data.solution))
        dispatch(changeValueBoards(data.solution))
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        dispatch(setSolveLoading(false))
      })
  }
}

export function changeValueBoards (payload) {
  return { type: 'editedBoards/setEditedBoardsValue', payload }
}

export function setValueBoards (indexI, indexJ, value) {
  return (dispatch, getState) => {
    const { boards } = getState().boardReducer

    let payload = JSON.parse(JSON.stringify(boards))
    payload[indexI][indexJ] = value

    dispatch(changeValueBoards(payload))
  }
}

export function addLeaderboards (payload) {
  return (dispatch, getState) => {
    const { leaderboards } = getState().leaderboardsReducer

    const newLeaderboards = JSON.parse(JSON.stringify(leaderboards))

    if (newLeaderboards.length < 5) {
      dispatch({ type: 'leaderboards/AddLeaderboards', payload })
    } else {
      newLeaderboards.sort((a,b) => {
        return a.points-b.points
      })
      newLeaderboards.splice(0, 1)
      newLeaderboards.push(payload)

      dispatch(setLeaderboards(newLeaderboards))
    }

  }
}

export function setLeaderboards (payload) {
  return { type: 'leaderboards/setLeaderboards', payload }
}

export function setIsLoading (payload) {
  return { type: 'isLoading/setIsLoading', payload }
}

export function setValidateLoading (payload) {
  return { type: 'validateLoading/setValidateLoading', payload }
}

export function setSolveLoading (payload) {
  return { type: 'solveLoading/setIsLoading', payload }
}
