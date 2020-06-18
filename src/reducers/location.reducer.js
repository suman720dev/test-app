import { ADD_LOCATION, CLEAR_LOCATION } from "../actions/location";

export function location(state = [], action) {
  switch (action.type) {
    case ADD_LOCATION:
        const existsInArray = state.some(
          (l) => l.info === action.location.info
        );
        if (existsInArray) {
          return state;
        }
        return [
          ...state,
          action.location,
        ];
    case CLEAR_LOCATION:
      return [];
    default:
      return state;
  }
}