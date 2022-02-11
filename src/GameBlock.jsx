import React from 'react';
import Typography from '@mui/material/Typography';
import '@fontsource/roboto/400.css';
import Button from '@material-ui/core/Button';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import { useSelector, useDispatch } from 'react-redux';

//О шрифте Roboto и других:
//https://fontsource.org/docs/getting-started
//https://mui.com/components/typography/

import ShowTrueGridBlock from "./ShowTrueGridBlock.jsx";
import Grid from "./Grid.jsx";
import {start, hideGrid, check, finish} from './react-redux-store/slice.js';
import GAME_STAGES from './info_gameStages.js';
import DURATIONS from './info_durations.js';

function showGridForMemorization(dispatch, durationInMs) { 
    setTimeout(() => dispatch(hideGrid()), durationInMs);
    dispatch(start());
}


function createDurationSelectOptionsArray(sourceArray) {    
    return sourceArray.map((durationInfoObj) => 
        <option value={durationInfoObj.value}>{durationInfoObj.textView}</option>
    );
}

function getDurationFromSelectElement(selectElementRef) {
    return Number(selectElementRef.current.value);
}

export default function GameBlock() {
    const gameStage = useSelector((state) => state.gameStage);
    const trueGridCells = useSelector((state) => state.trueGridCellsArray);
    const dispatch = useDispatch();

    const uniWidth = "700px";
    const controlsBlockStyle = {
        display: "flex",
        justifyContent: "space-between",            
        width: uniWidth
    };

    let controlsBlock, showTrueGridBlock, intro;

    //О цветах, палеттах и темах:
    //https://mui.com/system/palette/
    //https://mui.com/customization/palette/
    //https://mui.com/customization/theming/


    if(gameStage==GAME_STAGES.initial) {
        const selectDurationBlockStyle = {
            display: "flex",
            flexDirection: "row",
            alignItems: "center"
        };
        const introBoxSx = {
            width: uniWidth,
            fontFamily: "Roboto", 
            bgcolor: 'text.disabled', 
            p: "5px", 
            mt: "20px",
            border: "1px solid black"
        };
        const selectDurationRef = React.createRef();
        controlsBlock = (
            <div style={controlsBlockStyle}>
                <Button variant="contained" onClick={() => showGridForMemorization(dispatch, getDurationFromSelectElement(selectDurationRef))}>Start</Button>
                <div style={selectDurationBlockStyle}>
                    <Typography component="span" variant="body1" sx={{fontFamily: "Roboto", mr: "5px"}}>
                        Select the duration:
                    </Typography>
                    <select ref={selectDurationRef}>
                        {createDurationSelectOptionsArray(DURATIONS)}
                    </select>
                </div>
            </div>
        );
        intro = (
            <Box sx={introBoxSx}>
                <div style={{display: "flex", flexDirection: "column"}}>
                    <Typography variant="h5" component="span">
                        This is the game to improve your visual memory.
                    </Typography>
                    <Typography variant="body1" component="span">
                        By clicking the "Start" button you will see a grid with a set of pictures for some time (you can select it in the "Select the duration" element). Then the grid will be hidden, and you should reproduce it as accurately as possible and check the result by clicking on the "Check" button.<br/>
                        Have a good game!
                    </Typography>
                </div>
            </Box>
        );
    }
    else if(gameStage==GAME_STAGES.gridIsShown) {
        controlsBlock = <Typography variant="h5" component="span">Remember the grid...</Typography>
    }
    else if(gameStage==GAME_STAGES.itemsGuessing) {
        controlsBlock = (
            <div style={controlsBlockStyle}>
                <Typography variant="h5" component="span">Try to reproduce the grid!</Typography>
                <Button variant="contained" onClick={() => dispatch(check())}>Check your grid</Button>
            </div>
        );
    }
    else if(gameStage==GAME_STAGES.trueGridIsShown) {
        controlsBlock = <Button variant="contained" onClick={() => dispatch(finish())}>Finish</Button>;
        showTrueGridBlock = <ShowTrueGridBlock trueGridCells={trueGridCells}/>;
    }
    
    return (
        <div style={{display: "flex", flexDirection: "column", marginLeft: "10px", marginTop: "10px"}}>
            <div style={{marginBottom: "10px"}}>
                <Grid style={{width: uniWidth}}/>
            </div>
            <Stack direction="row" spacing={"15px"} sx={{mt: "10px"}}>
                {controlsBlock}
                {showTrueGridBlock}
            </Stack>
            {intro}
        </div>
    );
}

