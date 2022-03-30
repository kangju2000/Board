import { GET_POSTS } from "../_actions/types";

export default function (state = {}, action) {
    switch (action.type) {
        case GET_POSTS:
            return { ...state, getSuccess: action.payload };
        default:
            return state;
    }
}
