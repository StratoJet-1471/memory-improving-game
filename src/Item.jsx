import React from 'react';
import Popover from '@mui/material/Popover';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Button from '@material-ui/core/Button';
import Typography from '@mui/material/Typography';
import '@fontsource/roboto/400.css';

import { useSelector } from 'react-redux';

import ImageChoiceScrollingGrid from "./ImageChoiceScrollingGrid.jsx";

import getItemTypeDataObject from './getItemTypeDataObject.js';

import "./css/styles.css";
import GAME_STAGES from './info_gameStages.js';

function PopoverBlock(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
  
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    const open = Boolean(anchorEl);

    return (
    <div className="item-bar__content-container_select">
      <Button onClick={handleClick}>Select image</Button>
      <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      sx={{width: "300px"}}>
          <ImageChoiceScrollingGrid cellId={props.cellId} closingFunc={handleClose}/>
        </Popover>
    </div>
    );
}

function RightChoiceBlock() {
  return (
    <div className="item-bar__content-container_checked">
      <img src="img/icon_correct.png" className="item-bar__icon" />
      <Typography variant="body1" component="span" sx={{ml: "10px", color: "success.main", fontFamily: "Roboto"}}>Correct</Typography>
    </div>
  );
}

function WrongChoiceBlock() {
  return (
    <div className="item-bar__content-container_checked">
      <img src="img/icon_incorrect.png" className="item-bar__icon" />
      <Typography variant="body1" component="span" sx={{ml: "10px", color: "error.main", fontFamily: "Roboto"}}>Incorrect</Typography>
    </div>
  );
}

export default function Item(props) {
    const gameStage = useSelector((state) => state.gameStage);
    const correctnessOfCellsDataArray = useSelector((state) => state.correctnessOfCellsDataArray);
    const typeDataObj = getItemTypeDataObject(props.typeId);

    let itemBar = <React.Fragment></React.Fragment>;

    if(gameStage==GAME_STAGES.itemsGuessing) 
        itemBar = <ImageListItemBar subtitle={<PopoverBlock cellId={props.cellId}/>} position="below"/>;
    else if(gameStage==GAME_STAGES.trueGridIsShown) {
        if(correctnessOfCellsDataArray[props.cellId])
            itemBar = <ImageListItemBar subtitle={<RightChoiceBlock/>} position="below"/>;
        else itemBar = <ImageListItemBar subtitle={<WrongChoiceBlock/>} position="below"/>;
    }

    return (
      <div>
          <img src={typeDataObj.img} className="item-img" loading="lazy" />
          {itemBar}
      </div>
    );

}