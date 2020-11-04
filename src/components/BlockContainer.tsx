import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../Reducers/redux-reduser";
import {BlockType, cleanClickedBlocksAC, getClickedBlocksAC, setBlocksAC} from "../Reducers/appReducer";
import Block from "./block";
import appStyle from "../appStyle.module.css";

type BlockContainerType = {
    startFunc:()=>void;
}
let BlockContainer = (props:BlockContainerType) =>{
    let [result,setresult] = useState<boolean>(false)
    let dispatch = useDispatch();
    let finalArrayFromReducer = useSelector<RootState, Array<BlockType>>(state => state.app.finalArrFromReducer);
    let blueIds = useSelector<RootState, Array<number>>(state => state.app.blueIdsFromFinal);
    let clickedIds = useSelector<RootState,Array<number>>(state => state.app.clickedBlocks);
    let newCont = finalArrayFromReducer.map(el=> <Block key={el.id} bColor={el.color} idOrder={el.id} clickedIds={clickedIds} />);




    const calculateResult = () =>{
        let a = clickedIds.filter((item, index) => clickedIds.indexOf(item) === index);
        console.error(a)
        if(JSON.stringify(blueIds)==JSON.stringify(a.sort())){
            return setresult( true )
        }else{
            setresult( false )}}

    const onClickHandler = () =>{
        props.startFunc();
        dispatch(cleanClickedBlocksAC())
        calculateResult();

    };

    return (
        <div>
            <p>Само тестовое:


                при загрузке страницы отобразить 6 квадров разных цветов, от 1 до 3 квадратов должны быть синим<br/> (всегда произвольное количество):
                пользователь должен иметь возможно выбирать квадраты,<br/> если квадрат выбран у него появляется желтый бордер.<br/>
                добавить кнопку сабмит при которой проверяется что выбраны все синие квадраты, <br/>если выбраны не все или не только синие показывать сообщение об ошибке. Если все выбраны правильно показывать сообщение об этом и перегенрировать квадраты.</p>
        <div className={appStyle.wrapper}>
            {newCont} </div>
           <div className={appStyle.buttonContainer}> <button className={appStyle.button} onClick={onClickHandler}>submit</button> </div>
            {result?<span  className={appStyle.buttonContainer} > правильно!</span>:<span className={appStyle.buttonContainer} > НЕ правильно!</span>}

            </div>
    )
}
export default BlockContainer;