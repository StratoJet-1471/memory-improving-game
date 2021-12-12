import {getItemTypesNumber} from "./info_itemTypes.js";

function getRandomItemTypeId() {
    return Math.floor(Math.random() * getItemTypesNumber()); //Будет выборка от 0 до (getItemTypesNumber()-1).
}

export default function createRandomGrid(itemsNumber) {
    let gridArray = [];    
    for (let i = 0; i < itemsNumber; i++) { gridArray.push(getRandomItemTypeId()); }

    return gridArray;
}