import React, {useEffect} from 'react';
import './App.css';
import {useDispatch} from "react-redux";
import {getBlueIdsFromFinalAC,setBlocksAC} from "./Reducers/appReducer";
import BlockContainer from "./components/BlockContainer";

function App() {
    let dispatch = useDispatch();

    let startFunc = () =>{
        dispatch(setBlocksAC());
        dispatch(getBlueIdsFromFinalAC());

    }
 useEffect(()=> startFunc(),[] )



    return (
    <div className="App">
        <div>
           <BlockContainer startFunc={startFunc}/>
        </div>

    </div>
  );
}

export default App;
