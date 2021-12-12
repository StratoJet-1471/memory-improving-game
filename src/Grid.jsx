import React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

import { useSelector } from 'react-redux';

import ImageListItemBar from '@mui/material/ImageListItemBar';
import Typography from '@mui/material/Typography';
import '@fontsource/roboto/400.css';

import getItemTypeDataObject from './getItemTypeDataObject.js';
import PopoverBlockForImageSelection from "./PopoverBlockForImageSelection.jsx";

import "./css/styles.css";
import GAME_STAGES from './info_gameStages.js';


function CorrectlySelectedItemBarContent() {
  return (
    <div className="item-bar__content-container_checked">
      <img src="img/icon_correct.png" className="item-bar__icon" />
      <Typography variant="body1" component="span" sx={{ml: "10px", color: "success.main", fontFamily: "Roboto"}}>Correct</Typography>
    </div>
  );
}

function IncorrectlySelectedItemBarContent() {
  return (
    <div className="item-bar__content-container_checked">
      <img src="img/icon_incorrect.png" className="item-bar__icon" />
      <Typography variant="body1" component="span" sx={{ml: "10px", color: "error.main", fontFamily: "Roboto"}}>Incorrect</Typography>
    </div>
  );
}


/*
https://mui.com/api/image-list/
https://mui.com/api/image-list-item-bar/
https://mui.com/api/image-list-item/
https://mui.com/components/popover/
*/

function createItem({itemTypeId, indexInCellsArray, gameStage, correctnessOfCellsDataArray}) {
  const typeDataObj = getItemTypeDataObject(itemTypeId);

  let itemBar = <React.Fragment></React.Fragment>;

  if(gameStage==GAME_STAGES.itemsGuessing) 
      itemBar = <ImageListItemBar subtitle={<PopoverBlockForImageSelection cellId={indexInCellsArray}/>} position="below"/>;
  else if(gameStage==GAME_STAGES.trueGridIsShown) {
      if(correctnessOfCellsDataArray[indexInCellsArray])
          itemBar = <ImageListItemBar subtitle={<CorrectlySelectedItemBarContent/>} position="below"/>;
      else itemBar = <ImageListItemBar subtitle={<IncorrectlySelectedItemBarContent/>} position="below"/>;
  }

  return (
    <ImageListItem key={indexInCellsArray}>
        <img src={typeDataObj.img} loading="lazy" />
        {itemBar}
    </ImageListItem>
  );
}

export default function Grid(props) {
    const gridCellsArray = useSelector((state) => state.gridCellsArray);
    const gameStage = useSelector((state) => state.gameStage);
    const correctnessOfCellsDataArray = useSelector((state) => state.correctnessOfCellsDataArray);
    
    let width = "700px";    
    if(props.style && props.style.width) width = props.style.width;

    return (
        <ImageList cols={3} sx={{width: width}} rowHeight={"180px"}>
          {gridCellsArray.map((itemTypeId, index) => {
            const createItemParamsObj = {
              itemTypeId,
              indexInCellsArray: index,
              gameStage,
              correctnessOfCellsDataArray
            };
            return createItem(createItemParamsObj);
          })}
        </ImageList>
    );
}