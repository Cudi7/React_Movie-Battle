import { combineReducers } from 'redux';
import moviesReducer from './ui/moviesSlice';

export default combineReducers({
  movies: moviesReducer,
});
