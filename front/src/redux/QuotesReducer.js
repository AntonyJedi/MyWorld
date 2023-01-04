import {quotesAPI} from "../API/api";

const initStore = {
  quotesStore: []
}

const QuotesReducer = (state = initStore, action) => {
  switch (action.type) {
    case 'GET-ALL-QUOTES':
      return {
        ...state,
        quotesStore: action.quotes
      }
    default:
      return state
  }
}

const getQuotesActionCreator = allQuotes => ({type: 'GET-ALL-QUOTES', quotes: allQuotes})

export const getQuotesThunkCreator = () => async (dispatch) => {
  const response = await quotesAPI.getAllQuotes()
  dispatch(getQuotesActionCreator(response.data))
}

export default QuotesReducer;