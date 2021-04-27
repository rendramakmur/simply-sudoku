const initialState = {
  boards: [],
  templateBoards: [],
  editedBoards: [],
  validate: 'unsolved',
  startTimer: false,
  isLoading: false,
  validateLoading: false,
  solveLoading: false
}

function reducer (state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case 'boards/fetchBoards':
      return { ...state, boards: payload }
    case 'templateBoards/setTemplateBoards':
      return { ...state, templateBoards: payload }
    case 'editedBoards/setEditedBoardsValue':
      return { ...state, editedBoards: payload }
    case 'validate/validateBoards':
      return { ...state, validate: payload }
    case 'isLoading/setIsLoading':
      return { ...state, isLoading: payload }
    case 'validateLoading/setValidateLoading':
      return { ...state, validateLoading: payload }
    case 'solveLoading/setIsLoading':
      return { ...state, solveLoading: payload }
    case 'startTimer/setStartTimer':
      return { ...state, startTimer: payload }
    default:
      return state
  }
}

export default reducer