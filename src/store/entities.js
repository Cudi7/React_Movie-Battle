import { combineReducers } from 'redux';
import movieFightReducer from './entities/movieFightSlice';

export default combineReducers({
  movieFight: movieFightReducer,
});
