const initialState = {
  leaderboards: []
}

function reducer (state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case 'leaderboards/setLeaderboards':
      return { ...state, leaderboards: payload }
    case 'leaderboards/AddLeaderboards':
      return { ...state, leaderboards: [ ...state.leaderboards, payload ] }
    default:
      return state
  }
}

export default reducer