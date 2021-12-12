import {getEmptyItemTypeId} from "./info_itemTypes.js";

export default function createEmptyGrid(itemsNumber) {
    let gridArray = [];
    for (let i = 0; i < itemsNumber; i++) { gridArray.push(getEmptyItemTypeId()); }

    return gridArray;
}