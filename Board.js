

import React, { useState, useEffect,useRef } from 'react';

import { StyleSheet, Text, View,ScrollView, TouchableOpacity,Animated,Alert } from 'react-native';
import _ from 'lodash';
import LottieView from 'lottie-react-native';
const customData = require('./level0.json');
// const sudoku = require('./sudoku.js').sudoku
// const Puzzle = require('./main.js')

    
 const Board = () => {
  //  let puzzle = sudoku.generate('easy')

const showAlert = () =>
  Alert.alert(
    "Alert Title",
    "My Alert Msg",
    [
      {
        text: "Cancel",
        onPress: () => Alert.alert("Cancel Pressed"),
        style: "cancel",
      },
    ],
    {
      cancelable: true,
      onDismiss: () =>
        Alert.alert(
          "This alert was dismissed by tapping outside of the alert dialog."
        ),
    }
  );

 const fadeAnim = useRef(new Animated.Value(1)).current  

  
let [data,setData]= useState(customData.Puzzle)
let dataSolution = customData.Solution
 let [values,setValues] = useState([{value:'',row:'',column:'',status:''}])
 
let grid = []
 

useEffect(() => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 600,
      }
    ).start();
  }, [fadeAnim])


  let createGrid =()=>{
    
  

	for(var i = 0; i < data.length; i++) {
		grid[i] = [];
		for(var j = 0; j < data[i].length; j++) {
			grid[i][j] = {value:data[i][j],notes:'',duplicate:false,error:0,locked:data[i][j] === 'None'? false:true,col:j,grid:i};
		}
	}
    return grid 
   
 }

grid = createGrid()
console.log(grid)
let [gridState,setGridState] = useState(grid)
console.log(gridState)
     const onSelect = (cell) => {
  
let checker = false
    if(checker === false){
      setValues({ value:cell.value,column:cell.col,row:cell.grid,status:cell.locked })
     checker = true
    }
    else{
      setValues({ value:'',column:'',row:'',status:'' })
      checker =false
    }
    
  }

  
 let duplicateFunction = ()=>{
    let gridValues =[]
     gridState.map(i => i.map( p => gridValues.push(p.value)))

    for(let i =0;i<9;i++){
      for(let j =0;j<9;j++){
        if( values.value=== gridState[i][j].value){
          
           gridState[i][j].duplicate = true
          
        }
        else{
                     gridState[i][j].duplicate = false

        }
       
        
      }
    }
         
  }


duplicateFunction()

 const duplicateStyle = cell => {
    return (cell.duplicate) ? { color: '#fff247' } : {};
  };
 

 const selectViewStyle =(colIdx,gridIdx) =>{
   return (
      values !== null &&
      values.row === gridIdx && 
      values.column === colIdx &&
      values.status === false)   ?
        { backgroundColor: '#fff247' } : {};
  
 }


const editCell = (value)=>{
setValues({...values,value:value})
 let grid = _.cloneDeep(gridState);
grid[values.row][values.column].value = value

  setGridState(grid)
  
}
console.log(gridState)

const checkErorr =( cell)=>{
   return(
   cell.locked === false && 
   cell.value !== dataSolution[cell.grid][cell.col]  &&
   cell.value !== 'None' ?  {backgroundColor:'red'}:{}
   )
 }
    

const endGame = ()=>{
  
    let arr = []
arr.push(gridState.map((i,x) => i.map(o => o.value)))
 
  return (
 JSON.stringify(arr[0]) === JSON.stringify(dataSolution)  ? alert("game is ended") : ''
  )

}
endGame()

const resetGame  = ()=>{
setGridState(grid)

}
console.log(gridState)

 const renderText = (cell)=> {

     
        return(
       <Text style={[{color:'white',fontSize:32},duplicateStyle(cell)]}>{cell.value === 'None'?'':cell.value }</Text>
      
        )
    
  }



const renderCell = (cell)=>{
  
 return(
     <View style={[styles.view,selectViewStyle(cell.col,cell.grid),checkErorr(cell),endGame(cell)]}>
            {renderText(cell)}
     </View >
    )
  

    
  
  
    } 



 
    
       const renderCells = (cell)=>{
     
      return(
        <>
         <TouchableOpacity  style={styles.container2} onPress={()=>onSelect(cell)} >
       {renderCell(cell)}
      </TouchableOpacity>
      </>
      )
     }
  
   
       const renderGrids = (grids)=> {
         return(
        
           grids.map((gridu) => renderCells(gridu))
     
         )
      
       
     
    
  }
//   console.log(cellsValues)

    return(
  
    <View style={styles.container}>
     
     {gridState.map( grids => 
     
         
          <View style={styles.container2}> 
         {renderGrids(grids)}
      </View>
       /*  */
      
      )}
  

   <View >
       {[1,2,3,4,5,6,7,8,9].map(i => 
         <TouchableOpacity onPressIn={() => editCell(i)}><Text>{i}</Text></TouchableOpacity> 
        )}
        <TouchableOpacity onPressIn={resetGame}><Text>reset</Text></TouchableOpacity>
   </View>
 </View>


    )
        }
       
    



const styles = StyleSheet.create({
container:{
    flex:1,  
    width:`100%`,
    height:`100%`,
    flexDirection:'row',
      flexWrap: "wrap",
    
},
container2:{
  
    flexDirection: "row",
    flexWrap: "wrap",
    width:'33.33333%',
    height:`33.3333%`,
   
    zIndex:2
 
},
 
view:{
    width:'100%',
    height:`100%`,
    borderWidth:3,
    backgroundColor:'black',
    borderColor:'white',
    
   
},
childView:{
      width:'33.33333%',
    height:`33.33333%`,
    borderWidth:3,
    backgroundColor:'black',
    borderColor:'white'
}

})
export default Board