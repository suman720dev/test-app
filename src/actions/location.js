export const ADD_LOCATION = "ADD_LOCATION";
export const CLEAR_LOCATION = "CLEAR_LOCATION";

export function addLocation(location) {
    return { type: ADD_LOCATION, location };
}

export function clearLocation(location) {
    return { type: CLEAR_LOCATION };
}
