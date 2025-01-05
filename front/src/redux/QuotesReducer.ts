// @ts-ignore
import {quotesAPI} from '../API/api.js';

type initStoreType = {
  quotesStore: Array<string>
}

const initStore: initStoreType = {
  quotesStore: []
}

const QuotesReducer = (state = initStore, action: any): initStoreType => {
  switch (action.type) {
    case 'GET-ALL-QUOTES':
      return {
        ...state,
        quotesStore: action.allQuotes
      }
    default:
      return state
  }
}

type getQuotesActionCreatorType = {
  type: string,
  allQuotes: Array<string>
}

const getQuotesActionCreator = (allQuotes: Array<string>): getQuotesActionCreatorType => ({type: 'GET-ALL-QUOTES', allQuotes})

export const getQuotesThunkCreator = () => async (dispatch: any) => {
  const response = await quotesAPI.getAllQuotes()
  dispatch(getQuotesActionCreator(response.data))
}

export default QuotesReducer;