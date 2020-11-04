export type BlockType = {
    id: number,
    color: string
}

export type InitialStateType = {
    finalArrFromReducer: Array<BlockType>,
    initialArr: Array<BlockType>,
    blueIdsFromFinal: Array<number>,
    clickedBlocks: Array<number>
};


const initialState: InitialStateType = {
    clickedBlocks: [],
    blueIdsFromFinal: [],
    finalArrFromReducer: [],
    initialArr: [{id: 1, color: 'brown'},
        {id: 2, color: 'blue'}, {id: 8, color: 'yellow'}, {id: 3, color: 'red'}, {id: 4, color: 'blue'},
        {id: 5, color: 'blue'}, {id: 6, color: 'black'}, {id: 7, color: 'orange'}]
};


type ActionsType = setBlocksACType | getClickedBlocksACType | getBlueIdsFromFinalACType | cleanClickedBlocksACType;


const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP_SET_BLOCK':

            let initialArray = [...state.initialArr.map((e, i) => {
                return {id: e.id, color: e.color}
            })];
            let finalArr = [...state.finalArrFromReducer.map((e, i) => {
                return {id: e.id, color: e.color}
            })];
            finalArr = []
            let func = (initialArray: any, finalArr: any) => {

                for (var i = initialArray.length - 1; i >= 0; i--) {

                    for (var j = 0; j < finalArr.length; j++) {
                        if (initialArray[i] && (initialArray[i].id === finalArr[j].id)) {
                            initialArray.splice(i, 1);
                        }
                    }
                }
                initialArray.forEach((el: any) => Math.random() > 0.5 && finalArr.length < 6 ? finalArr.push(el) : '');
                do {
                    if (finalArr.length < 6) {
                        func(initialArray, finalArr)
                    }
                } while (finalArr.length < 6)
                return finalArr

            }
            func(initialArray, finalArr)
            return {...state, finalArrFromReducer: finalArr};

        case 'APP_GET_BLUE_BLOCKS':
            let copiedArrayOfBlocks = [...state.finalArrFromReducer.map((e, i) => {
                return {id: e.id, color: e.color}
            })];
            let idsFromCurrentAmountOfBlock = [...state.blueIdsFromFinal];
            idsFromCurrentAmountOfBlock = [];
            copiedArrayOfBlocks.map(el => el.color === 'blue' ? idsFromCurrentAmountOfBlock.push(el.id) : "")
            idsFromCurrentAmountOfBlock.sort();
            return {...state, blueIdsFromFinal: idsFromCurrentAmountOfBlock};

        case 'APP_GET_CLICKED_BLOCKS':
            let idsWhithWasClicked = [...state.clickedBlocks];
            if (idsWhithWasClicked.includes(action.clickedIdBlocks)) {
                let delElem = idsWhithWasClicked.indexOf(action.clickedIdBlocks)
                idsWhithWasClicked.splice(delElem, 1)


            } else {
                idsWhithWasClicked.push(action.clickedIdBlocks)
            }

            return {...state, clickedBlocks: idsWhithWasClicked};

        case 'APP_CLEAN_CLICKED_BLOCKS' :
            return {...state, clickedBlocks: []};


        default:
            return {...state}
    }
}


export const setBlocksAC = () => ({type: 'APP_SET_BLOCK'} as const);
export const getBlueIdsFromFinalAC = () => ({type: 'APP_GET_BLUE_BLOCKS'} as const)
export const getClickedBlocksAC = (clickedIdBlocks: number) => ({
    type: 'APP_GET_CLICKED_BLOCKS',
    clickedIdBlocks
} as const)
export const cleanClickedBlocksAC = () => ({type: 'APP_CLEAN_CLICKED_BLOCKS'} as const)


export default appReducer;


export type getClickedBlocksACType = ReturnType<typeof getClickedBlocksAC>;
export type setBlocksACType = ReturnType<typeof setBlocksAC>;
export type getBlueIdsFromFinalACType = ReturnType<typeof getBlueIdsFromFinalAC>;
export type cleanClickedBlocksACType = ReturnType<typeof cleanClickedBlocksAC>;

