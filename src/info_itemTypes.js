export function getItemTypesNumber() {
    return 11;
}

export function getEmptyItemTypeId() {
    return 0;
}

export function getAllItemTypeDataObjects() {
    const type1_data = { typeId: 1, img: "img/bus_1.jpg"};
    const type2_data = { typeId: 2, img: "img/bus_2.jpg"};
    const type3_data = { typeId: 3, img: "img/bus_3.jpg"};
    const type4_data = { typeId: 4, img: "img/bus_4.jpg"};
    const type5_data = { typeId: 5, img: "img/bus_5.jpg"};
    const type6_data = { typeId: 6, img: "img/chopper_1.jpg"};
    const type7_data = { typeId: 7, img: "img/chopper_2.jpg"};
    const type8_data = { typeId: 8, img: "img/chopper_3.jpg"};
    const type9_data = { typeId: 9, img: "img/chopper_4.jpg"};
    const type10_data = { typeId: 10, img: "img/chopper_5.jpg"};
    const typeEmpty_data = { typeId: 0, img: "img/empty.jpg"};

    return [typeEmpty_data, type1_data, type2_data, type3_data, type4_data, type5_data, type6_data, type7_data, type8_data, type9_data, type10_data];
}