import { configureStore } from '@reduxjs/toolkit';
import gameStateReducer from './slice.js';
import createEmptyGrid from "../createEmptyGrid.js";
import GRID_CELLS_NUMBER from "../info_gridParams.js";
import GAME_STAGES from "../info_gameStages.js";

export default configureStore({
    reducer: gameStateReducer,
    preloadedState: {
      gridCellsArray: createEmptyGrid(GRID_CELLS_NUMBER),
      trueGridCellsArray: null,
      gameStage: GAME_STAGES.initial,
      correctnessOfCellsDataArray: null
    }
  })