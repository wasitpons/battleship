const express = require('express');
const router = express.Router();

var fieldController = require('../controllers/fieldController');
var playerController = require('../controllers/playerController');
var gameController = require('../controllers/gameController');

router.get('/', (req, res) => {
    res.send({'Hello':'World'});
});

/*  ==========  BEGIN OF FIELDS CONTROLLER ==========*/
router.get('/getfieldall', async (req,res) => {
    res.send(await fieldController.getFieldAll());
});

router.post('/getfield', async (req,res) => {
    let filter = req.body;
    res.send(await fieldController.getField(filter));
});

/*  ==========  END OF FIELDS CONTROLLER ==========*/

/*  ==========  BEGIN OF PLAYER CONTROLLER ==========*/
router.get('/getplayerall', async (req,res) => {
    res.send(await playerController.getPlayerAll());
});

router.post('/getplayer', async (req,res) => {
    let filter = req.body;
    res.send(await playerController.getPlayer(filter));
})
/*  ==========  END OF PLAYER CONTROLLER ==========*/

/*  ==========  BEGIN OF GAME CONTROLLER ==========*/

router.post('/creategame', async (req,res) => {
    let playerName = req.body.playerName;
    res.send(await gameController.creategame(playerName));
});

router.post('/ranking', async (req,res) => {
    let limit = req.body.limit;
    res.send(await gameController.ranking(limit));
})

router.get('/howtoplay', (req,res) => {
    res.redirect('https://docs.google.com/document/d/1V4hs8vSNFOhKSkSup0DVGdmKUnW4tTAYsIVsGyvIppU/edit');
});
/*  ==========  END OF GAME CONTROLLER ==========*/
module.exports = router;