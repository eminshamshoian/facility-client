import { SHOW_ADD_MODAL, SHOW_EDIT_MODAL, SHOW_VIEW_MODAL } from '../types';

const initialState = {
    add: false,
    edit: false,
    view: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SHOW_ADD_MODAL:
            return {
                ...state,
                add: action.payload
            };
        case SHOW_EDIT_MODAL:
            return {
                ...state,
                edit: action.payload
            };
        case SHOW_VIEW_MODAL:
            return {
                ...state,
                view: action.payload
            };
        default:
            return state;
    }
};
