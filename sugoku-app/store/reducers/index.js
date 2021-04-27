import { combineReducers } from 'redux'
import boardReducer from './boardReducer'
import leaderboardsReducer from './leaderboardsReducer'

const reducer = combineReducers({
  boardReducer,
  leaderboardsReducer
})

export default reducer