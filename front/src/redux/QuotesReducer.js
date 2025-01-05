"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getQuotesThunkCreator = void 0;
// @ts-ignore
const api_js_1 = require("../API/api.js");
const initStore = {
    quotesStore: []
};
const QuotesReducer = (state = initStore, action) => {
    switch (action.type) {
        case 'GET-ALL-QUOTES':
            return Object.assign(Object.assign({}, state), { quotesStore: action.allQuotes });
        default:
            return state;
    }
};
const getQuotesActionCreator = (allQuotes) => ({ type: 'GET-ALL-QUOTES', allQuotes });
const getQuotesThunkCreator = () => (dispatch) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield api_js_1.quotesAPI.getAllQuotes();
    dispatch(getQuotesActionCreator(response.data));
});
exports.getQuotesThunkCreator = getQuotesThunkCreator;
exports.default = QuotesReducer;
