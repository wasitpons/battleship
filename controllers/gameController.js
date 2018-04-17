const fieldController = require('../controllers/fieldController');
const playerController = require('../controllers/playerController');

exports.creategame = async (playerName) => {
    
    if(playerName == null || playerName == ""){
        return({"success":false,"msg":"can't get playerName","data":[]});
    }
    else{
        let fieldID = await fieldController.createField();
        fieldID = fieldID.data._id;
        console.log(fieldID);
        return playerController.createPlayer(fieldID,playerName);
    }
}

exports.ranking = async (limit) => {

    // default limit is 5
    if(limit == null || limit == ""){   
        return playerController.ranking(5);  
    }
    else{
        return playerController.ranking(limit);
    }
}