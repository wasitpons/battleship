const fieldController = require('../controllers/fieldController');
const playerController = require('../controllers/playerController');

exports.creategame = async function(playerName) {
    
    if(playerName == null || playerName == ""){
        return({"success":false,"msg":"can't get playerName","data":[]});
    }
    else{
        let fieldID = await fieldController.createField();
        fieldID = fieldID.data._id;
        return playerController.createPlayer(fieldID,playerName);
    }
}

exports.ranking = async function(limit) {

    // default limit is 5
    if(limit == null || limit == ""){   
        return playerController.ranking(5);  
    }
    else{
        return playerController.ranking(limit);
    }
}

exports.cleardata = async function(fieldQuery,playerQuery) {
    let res = await fieldController.clearField(fieldQuery);
    if(!res.success){
        return res;
    }
    res = await playerController.clearPlayer(playerQuery)
    return res;
}

exports.defense = async function(playerID,selected){
    
    let player = await playerController.getPlayer({"_id":playerID});
    if(!player.success)  {   return player;  }
    let field = await fieldController.getField({"_id":player.data[0].fieldID});
    if(!field.success)  {   return field;   }
    let arrField = field.data[0].field
    let ship = {};
    ship = field.data[0].ship
    console.log(player.data[0].playerID);
    if(selected.length != 2 || !isNumber(selected,arrField.length) )    {
        return ({"success":false,"msg":"can't build a ship from your selected","data":[]});
    }

    return await fieldController.defense(arrField,player.data[0].fieldID,selected);
}

exports.attack = async function(playerID,selected){
    let player = await playerController.getPlayer({"_id":playerID});
    
    let field = await fieldController.getField({"_id":player.data[0].fieldID});
    let arrField = field.data[0].field
    if(selected.length != 2 || !isNumber(selected,arrField.length) )    {
        return ({"success":false,"msg":"can't build a ship from your selected","data":[]});
    }

    return await fieldController.attack(arrField,player.data[0].fieldID,playerID,selected,player.data[0].action,player.data[0].log);

}
function isNumber(selected,length){

    for(let i of selected.split('')){
        
        if( +i < 0 || +i > length){
            return false;
        }
    }
    return true;
}