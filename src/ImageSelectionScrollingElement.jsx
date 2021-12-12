import * as React from 'react';
import Stack from '@mui/material/Stack';
import { useSelector, useDispatch } from 'react-redux';

import getItemTypeDataObject from './getItemTypeDataObject.js';
import {getItemTypesNumber} from "./info_itemTypes.js";
import {selectImage} from './react-redux-store/slice.js';

import "./css/styles.css";

//Назвал бы эту ф-ю selectImage, но это имя уже используется.
function makeAnImageSelection({gridCellsArray, cellId, newTypeId, actionsDispatcher, closingFunc}) {
    gridCellsArray[cellId] = newTypeId;
    actionsDispatcher(selectImage({gridCellsArray: gridCellsArray}));
    closingFunc();
}

function ImagePreview(props) {
    const dataObject = getItemTypeDataObject(props.typeId);
    return (
        <div>
            <img className="img-preview" src={dataObject.img} onClick={props.onClick}/>
        </div>
    );
}

export default function ImageSelectionScrollingElement(props) {
    let copyOfGridCellsArray = Object.values(useSelector((state) => state.gridCellsArray));
    const dispatch = useDispatch();
    const imagePreviewsArrayLength = getItemTypesNumber();
    let imagePreviews = [];

    for (let i = 0; i < imagePreviewsArrayLength; i++) {
        const onClickParamsObj = {
            gridCellsArray: copyOfGridCellsArray,
            cellId: props.cellId,
            newTypeId: i,
            actionsDispatcher: dispatch,
            closingFunc: props.closingFunc
        }
        imagePreviews.push(<ImagePreview cellId={props.cellId} typeId={i} onClick={() => makeAnImageSelection(onClickParamsObj)}/>);
    }


    //https://mui.com/components/stack/
    return (
        <div className="img-choice img-choice-scrollbar">
            <Stack direction="row" spacing={2}>
                {imagePreviews}
            </Stack>            
        </div>
    );
}
