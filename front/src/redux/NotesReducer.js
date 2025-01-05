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
exports.deleteOneNoteThunkCreator = exports.updateOneNoteThunkCreator = exports.newNoteThunkCreator = exports.getNotesThunkCreator = void 0;
// @ts-ignore
const api_1 = require("../API/api");
const initStore = {
    notesStore: [],
    updatedNote: {},
    isFetching: true
};
const NotesReducer = (state = initStore, action) => {
    switch (action.type) {
        case 'GET-ALL-NOTES':
            debugger;
            return Object.assign(Object.assign({}, state), { notesStore: action.allNotes, isFetching: false });
        case 'SET-NEW-NOTE':
            debugger;
            return Object.assign(Object.assign({}, state), { notesStore: [...state.notesStore, action.newNote] });
        case 'DELETE-ONE-NOTE':
            return Object.assign(Object.assign({}, state), { notesStore: state.notesStore.filter(one => one.id !== action.id) });
        case 'CHANGE-ONE-NOTE':
            return Object.assign(Object.assign({}, state), { notesStore: state.notesStore.map(one => one.id === action.id ? Object.assign(Object.assign({}, one), { checked: !one.checked }) : one) });
        default:
            return state;
    }
};
const getNotesActionCreator = (allNotes) => ({ type: 'GET-ALL-NOTES', allNotes });
const setNewNoteActionCreator = (newNote) => ({ type: 'SET-NEW-NOTE', newNote });
const deleteOneNoteActionCreator = (id) => ({ type: 'DELETE-ONE-NOTE', id });
const changedOneNoteActionCreator = (id) => ({ type: 'CHANGE-ONE-NOTE', id });
const getNotesThunkCreator = (userName) => (dispatch) => __awaiter(void 0, void 0, void 0, function* () {
    debugger;
    try {
        const response = yield api_1.notesAPI.getAllNotes(userName);
        dispatch(getNotesActionCreator(response.data));
    }
    catch (e) {
        console.log(e);
    }
});
exports.getNotesThunkCreator = getNotesThunkCreator;
const newNoteThunkCreator = (note) => (dispatch) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield api_1.notesAPI.createNewNote(note);
        yield dispatch(setNewNoteActionCreator(res.data));
    }
    catch (e) {
        console.log(e);
    }
});
exports.newNoteThunkCreator = newNoteThunkCreator;
const updateOneNoteThunkCreator = (id) => (dispatch) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield api_1.notesAPI.updateOneNote(id);
        dispatch(changedOneNoteActionCreator(id));
    }
    catch (e) {
        console.log(e);
    }
});
exports.updateOneNoteThunkCreator = updateOneNoteThunkCreator;
const deleteOneNoteThunkCreator = (id) => (dispatch) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield api_1.notesAPI.deleteOneNote(id);
        dispatch(deleteOneNoteActionCreator(id));
    }
    catch (e) {
        console.log(e);
    }
});
exports.deleteOneNoteThunkCreator = deleteOneNoteThunkCreator;
exports.default = NotesReducer;
