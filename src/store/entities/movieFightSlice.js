import { createSelector, createSlice } from '@reduxjs/toolkit';

const movieFightSlice = createSlice({
  name: 'movieFight',
  initialState: {
    firstFighter: [],
    secondFighter: [],
  },
  reducers: {
    firstFighterAdded: (state, action) => {
      state.firstFighter = action.payload.fighter;
    },
    secondFighterAdded: (state, action) => {
      state.secondFighter = action.payload.fighter;
    },
    fightersReseted: (state, action) => {
      state.firstFighter = [];
      state.secondFighter = [];
    },
  },
});

export default movieFightSlice.reducer;
const { firstFighterAdded, secondFighterAdded, fightersReseted } =
  movieFightSlice.actions;

//ACTION CREATORS******************************************************************************************

export const addFirstFighter = (fighter) => (dispatch, getState) => {
  dispatch(firstFighterAdded({ fighter }));
};
export const addSecondFighter = (fighter) => (dispatch, getState) => {
  dispatch(secondFighterAdded({ fighter }));
};

export const resetFighters = () => (dispatch, getState) => {
  dispatch(fightersReseted());
};

//SELECTORS******************************************************************************************

export const selectFirstFighter = (state) =>
  createSelector(
    (state) => state.entities.movieFight.firstFighter,
    (firstFighter) => firstFighter
  );

export const selectSecondFighter = (state) =>
  createSelector(
    (state) => state.entities.movieFight.secondFighter,
    (secondFighter) => secondFighter
  );
