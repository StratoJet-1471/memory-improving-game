import { createSlice } from '@reduxjs/toolkit';
import createRandomGrid from "../createRandomGrid.js";
import createEmptyGrid from "../createEmptyGrid.js";
import GRID_CELLS_NUMBER from "../info_gridParams.js";
import GAME_STAGES from "../info_gameStages.js";

export const gameStateSlice = createSlice({
    name: "gameState",
    initialState: { 
        gridCellsArray: createEmptyGrid(GRID_CELLS_NUMBER),
        trueGridCellsArray: null,
        gameStage: GAME_STAGES.initial, 
        correctnessOfCellsDataArray: null
    },
    reducers: {
        start: function(state) {
            state.gridCellsArray = createRandomGrid(GRID_CELLS_NUMBER);
            state.gameStage = GAME_STAGES.gridIsShown;
            state.trueGridCellsArray = Object.values(state.gridCellsArray);
        },

        hideGrid: function(state) {
            state.gridCellsArray = createEmptyGrid(GRID_CELLS_NUMBER);
            state.gameStage = GAME_STAGES.itemsGuessing;
        },

        selectImage: function(state, value) {
            state.gridCellsArray = value.payload.gridCellsArray;
        },

        check: function(state) {
            state.correctnessOfCellsDataArray = [];
            for(let i = 0; i < state.gridCellsArray.length; i++) {
                if(state.gridCellsArray[i]==state.trueGridCellsArray[i]) state.correctnessOfCellsDataArray.push(true);
                else state.correctnessOfCellsDataArray.push(false);
            }
            state.gameStage = GAME_STAGES.trueGridIsShown;
        },

        finish: function(state) {
            state.gridCellsArray = createEmptyGrid(GRID_CELLS_NUMBER);
            state.trueGridCellsArray = null;
            state.gameStage = GAME_STAGES.initial; 
            state.correctnessOfCellsDataArray = null;
        }

    }
});

/*
Значение, возвращаемое ф-ей createSlice() (см. https://redux-toolkit.js.org/api/createSlice#return-value):
{
    name : string,
    reducer : ReducerFunction,
    actions : Record<string, ActionCreator>,
    caseReducers: Record<string, CaseReducer>
}
Each function defined in the reducers argument will have a corresponding action creator generated using createAction 
and included in the result's actions field using the same function name.
The generated reducer function is suitable for passing to the Redux combineReducers function as a "slice reducer".
*/

export const {start, hideGrid, selectImage, check, finish} = gameStateSlice.actions;
export default gameStateSlice.reducer;