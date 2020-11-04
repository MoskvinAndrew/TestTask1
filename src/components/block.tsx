import React, {useEffect, useState} from 'react';
import blockStyle from "./block.module.css";
import {getClickedBlocksAC} from "../Reducers/appReducer";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../Reducers/redux-reduser";


type BlockType = {
    bColor:string,
    idOrder:number,
    clickedIds:Array<number>
};

let Block =(props:BlockType) => {
    let clickedIds = useSelector<RootState,Array<number>>(state => state.app.clickedBlocks);
    let dispatch = useDispatch();


    let className = clickedIds.includes(props.idOrder) ? `${blockStyle.wrapperBlock} ${blockStyle.activeBorder}` : `${blockStyle.wrapperBlock}`

    let onClickHandler = () => {
        dispatch(getClickedBlocksAC(props.idOrder));
};

    return (
        <div>
            <div  className={className}   style={{/*border: '5px solid '+' '+ borderStyle,*/backgroundColor:props.bColor }} onClick={onClickHandler}> </div>
        </div>
    )
}
export default Block;