export const SUCCESS = 'ALERT_SUCCESS';
export const ERROR = 'ALERT_ERROR';
export const CLEAR = 'ALERT_CLEAR';
export const alertActions = {
  success,
  error,
  clear,
};

function success(message) {
  return { type: SUCCESS, message };
}

function error(message) {
  return { type: ERROR, message };
}

function clear() {
  return { type: CLEAR };
}

export default alertActions;
