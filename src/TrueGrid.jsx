import React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

import getItemTypeDataObject from './getItemTypeDataObject.js';

export default function TrueGrid(props) {
    return (
        <ImageList cols={3} sx={{width: "500px"}} onClick={props.closingFunc}>
            {props.trueGridCells.map((itemTypeId, index) => {
                const typeDataObj = getItemTypeDataObject(itemTypeId);

                return (
                    <ImageListItem key={index}>
                        <img src={typeDataObj.img}/>
                    </ImageListItem>
                );
            })}
        </ImageList>
      );
}