const fieldModel = require('../models/fieldModel');
const playerController = require('../controllers/playerController');
const mongoose = require('mongoose');
const Field = mongoose.model('Field');
const field = new Field();

var shipType = ['ShipType','subMarines','destroyer','cruisers','battleship'];

exports.getFieldAll = function() {
    let data = {};
    return field.getField(data);
}

exports.getField = function(data) {
    return field.getField(data);
}

exports.createField = function() {
    let currentDate = new Date();
    let status = "defender";
    let ship = {};
    ship.battleShip = 1;
    ship.cruisers = 2;
    ship.destroyer = 3;
    ship.subMarines = 4;
    let arr1 = [];
    let arr2 = [];

    for(let i=0; i<10; i++) {
        arr2 = [];
        for(let j=0; j<10; j++) {
            arr2.push("0");
        }
        arr1.push(arr2);
    }
    let filter = {};
    filter.datetime = currentDate.toISOString();
    filter.status = status;
    filter.ship = ship;
    filter.field = arr1;

    let query = new Field(filter);
    return field.createField(query);
}

exports.clearField = function(data){
    if(data == null || data == "")  {data = {}}
    
    return field.clearField(data);
}

exports.defense = async function(arrField,fieldID,selected){
    console.log(fieldID);
    let shipType = ['ShipType','subMarines','destroyer','cruisers','battleship'];
    let shipName = "subMarines";
    let ship = await calShip(arrField,"defense");
    
    let x = selected.split('')[0];
    let y = selected.split('')[1];
    x = +x;
    y = +y;

    let horizontal = await checkHorizontal(arrField,x,y);
    let vertical = await checkVertical(arrField,x,y);
    
    let filter = {};
    filter.success = true;
    filter.msg = "";
    filter.data = "";
    if( isShipRunOut(ship) ){
        filter.success = false;
        filter.msg = "can't build ship anymore";
        return filter;
    }
    
    else if( arrField[x][y] != "0" )   {
        if(vertical != 0 && vertical >= horizontal) {
            for(let i=+x; i<arrField.length && arrField[i][y] != 0; i++){
                arrField[i][y] = "0";
            }
            for(let i=+x-1; i>=0 && arrField[i][y] != 0; i--){
                arrField[i][y] = "0";
            }
        }
        
        if(horizontal != 0 && horizontal >= vertical){
            for(let i=y; i<arrField.length && arrField[x][i] != 0; i++){
                
                arrField[x][i] = "0";
            }
            for(let i=y-1; i>=0 && arrField[x][i] != 0; i--){
                arrField[x][i] = "0";
            }
        }
        updateField(arrField,fieldID);
        filter.msg = "clear ship";
        return filter;
    }
    else if(horizontal >=4 || vertical >=4){
        filter.success = false;
        filter.msg = "can't build ship anymore";
        return filter;
    }
    else if ( isSquare(arrField,x,y) )   {
        filter.success = false;
        filter.msg = "Can not build a ship that is close together."
        return filter;
    }
    else if( horizontal != 0)    {
        shipName = shipType[+horizontal+1];
        arrField = convertShipType("horizontal",x,y,shipName,arrField);
        
    }
    else if ( vertical != 0 )    {
        shipName = shipType[+vertical+1];
        arrField = convertShipType("vertical",x,y,shipName,arrField);
    }
    else{
        arrField[x][y] = shipName;
    }
    ship = await calShip(arrField,"defense");
    updateField(arrField,fieldID);
    updateShip(ship,fieldID);
    filter.msg = shipName + " : was builded";
    console.log("DEFENSE", "(" + x + "," + y + ")" + " : " + arrField[x][y]);
    filter.data = ship;
    return filter;
}

exports.attack = async function(arrField,fieldID,playerID,selected,action,log){
    let ship = await calShip(arrField); 
    let shipName;
    let x = selected.split('')[0];
    let y = selected.split('')[1];

    x = +x;
    y = +y;
    let filter = {};
    filter.success = true;
    filter.msg = "";
    filter.data = "";
    console.log("ATTACK", "(" + x + "," + y + ")" + " : " + arrField[x][y]);
    if( isShipRunOut(ship) ){
        filter.success = false;
        filter.msg = "can't attack ship anymore";
        return filter;
    }
    
    else if(arrField[x][y] == 0){
        filter.msg = "Miss";
        arrField[x][y] = "miss"
        action.move++;
        action.miss++;
    }

    else if(arrField[x][y] == "miss" || arrField[x][y] == "x"){
        filter.success = false;
        filter.msg = "can't attack this area (miss/hit) again";
        return filter;
    }

    else {
        action.move++;
        action.hit++;

        if( isSank(arrField,x,y) ){
            filter.msg = "You just sank the " + arrField[x][y];
            arrField[x][y] = "x";
        }
        else{
            filter.msg = "Hit";
            arrField[x][y] = "x";
        }
    }
    ship = await calShip(arrField);
    if(isShipRunOut(ship)){
        filter.msg = "Win! You completed the game in " + action.move + " moves";
    }
    updateField(arrField,fieldID);
    updateAction(action,selected,filter.msg,playerID,log);
    filter.data = ship;
    return filter;
}
async function updateAction(action,selected,msg,playerID,log){
    await playerController.updateAction(action,playerID);
    
    let filter = {'selected':selected,'action':action,'msg':msg};
    let arr = [];
    for(let i of log){
        arr.push(i);
    }
    arr.push(filter);

    await playerController.updateLog(arr,playerID);
}

function isSank(arrField,x,y){
    let shipName = arrField[x][y];
    // horizontal
    for(i=y+1; i<arrField.length && arrField[x][i] != "0"; i++){
        if(arrField[x][i] == shipName)  return false;
    }
    for(i=y-1; i>=0 && arrField[x][i] != "0"; i--){
        if(arrField[x][i] == shipName)  return false;
    }
    // vertical
    for(i=x+1; i<arrField.length && arrField[i][y] != "0"; i++){
        if(arrField[i][y] == shipName)  return false;
    }
    for(i=x-1; i>=0 && arrField[i][y] != "0"; i--){
        if(arrField[i][y] == shipName)  return false;
    }

    return true;

}

async function updateField(arrField,fieldID){
    let res = await field.updateField(arrField,fieldID);
}

async function updateShip(ship,fieldID){
    let res = await field.updateShip(ship,fieldID);
}

function isShipRunOut(ship){
    return (ship.ship.battleship==0&&ship.ship.cruisers==0&&ship.ship.destroyer==0&&ship.ship.subMarines==0)
}

function checkVertical(arrField,x,y){
    let shipLength=0;
    
    if(arrField[x][y] != 0) {   shipLength++; }

    if(x == 0){
        for(let i=1; i < arrField.length && arrField[i][y]!=0 ; i++)   {
            shipLength++;
        }
    }
    else if(x == arrField.length-2){
        for(let i=arrField.length-1; i >= 0 && arrField[i][y]!=0; i--)   {
            shipLength++;
        }
    }
    else{
        
        // check down side
        for(let i=x-1; (i>=0 && arrField[i][y]!=0); i--){
            
            shipLength++;
        }
       
        // check upper side
        for(let i=x+1; i < arrField.length && arrField[i][y]!=0  ; i++ ){
            shipLength++;
        }
        
    }
    return shipLength;
}

async function calShip(arrField,mode){
    
    let filter = {};
    filter.subMarines = 0;
    filter.destroyer = 0;
    filter.cruisers = 0;
    filter.battleship = 0;

    for(let i=0; i<arrField.length; i++){
        for(let j=0; j<arrField.length; j++){
            if(arrField[i][j] == "subMarines")          {filter.subMarines++;}
            else if(arrField[i][j] == "destroyer")      {filter.destroyer++;}
            else if(arrField[i][j] == "cruisers")       {filter.cruisers++;}
            else if(arrField[i][j] == "battleship")     {filter.battleship++;}
        }
    }
    
    filter.destroyer = Math.ceil(filter.destroyer/2);
    filter.cruisers = Math.ceil(filter.cruisers/3);
    filter.battleship = Math.ceil(filter.battleship/4);

    if(mode == "defense"){    
        filter.subMarines = 4 - filter.subMarines;
        filter.destroyer = 3 - filter.destroyer;
        filter.cruisers = 2 - filter.cruisers;
        filter.battleship = 1 - filter.battleship;
    }

    let filter2 = {}
    filter2.ship = filter;
    return filter2;
}
function checkHorizontal(arrField,x,y){
    let shipLength=0;
    if(arrField[x][y] != 0) {   shipLength++; }

    if(y == 0){
        for(let i=1; i < arrField.length && arrField[x][i]!=0 ; i++)   {
            shipLength++;
        }
    }
    else if(y == arrField.length-1){
        for(let i=arrField.length-2; i >=0 && arrField[x][i]!=0 ; i--)   {
            shipLength++;
        }
    }
    else{
        // check left side
        for(let i=y-1; i >=0 && arrField[x][i]!=0  ; i--){
            shipLength++;
        }
        // check right side
        for(let i=y+1; i < arrField.length && arrField[x][i]!=0 ; i++ ){
            shipLength++;
        }
    }
    return shipLength;
}

function convertShipType(type,x,y,shipName,arrField){
    arrField[x][y] = shipName;
    if(type == "vertical"){
        // convert down side
        for(let i=x; i<arrField.length && arrField[i][y]!= 0; i++){
            arrField[i][y] = shipName;
        }
        // convert upper side
        for(let i=x; i>=0 && arrField[i][y]!= 0; i--){
            arrField[i][y] = shipName;
        }
    }
    
    else if(type == "horizontal"){
        
        // convert right side
        for(let i=y; i<arrField.length && arrField[x][i]!= 0; i++){
            
            arrField[x][i] = shipName;
        }
        // convert left side
        for(let i=y; i>=0 && arrField[x][i]!= 0; i--){
            arrField[x][i] = shipName;
        }
    }

    return arrField;
}

function isSquare(arrField,x,y){
    let length = arrField.length;
    
    if(+x+1 < length && +y+1 < length){
        if(arrField[+x+1][+y+1] != 0)  {
            return true;
        }   
    }
    if(+x+1 < length && +y-1 >= 0){
        if(arrField[+x+1][+y-1] != 0)  {
            return true;
        }
    }
    if(+x-1 >= 0 && +y-1 >= 0){
        if(arrField[+x-1][+y-1] != 0)  {
            return true;
        }
    }
    if(+x-1 >= 0 && +y+1 < length){
        if(arrField[+x-1][+y+1] != 0)  {
            return true;
        }
    }

    return false;
}