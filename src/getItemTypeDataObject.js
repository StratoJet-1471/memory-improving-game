import {getAllItemTypeDataObjects} from "./info_itemTypes.js";

export default function getItemTypeDataObject(itemTypeId=0) {
    const typesDataObjects = getAllItemTypeDataObjects();

    if(itemTypeId >= 0 && itemTypeId < typesDataObjects.length) return typesDataObjects[itemTypeId];
    else return null;
}