import { apiCallBegan, fetchInitialVal } from '../../api/api';

const apiMiddleware =
  ({ dispatch }) =>
  (next) =>
  async (action) => {
    if (action.type !== apiCallBegan.type) return next(action);

    const { data, onSuccess, onError, onStart } = action.payload;

    if (onStart) dispatch({ type: onStart });

    //if there is already data (mostly comming from localStorage or DB, we dispatch success with the data and skip the rest of the api call)
    if (data) {
      //we add setTimeout because it comes from storage, so, there is no time to show the fancy awesome spinner
      setTimeout(() => dispatch({ type: onSuccess, payload: data }), 500);
      return;
    }

    next(action); //if we want the apiCallBegan to appear in redux devtools we need to specify this line, otherwise it will show only the other actions

    try {
      const response = await fetchInitialVal();
      dispatch({ type: onSuccess, payload: response });
    } catch (error) {
      dispatch({ type: onError, payload: error.message });
    }
  };

export default apiMiddleware;
