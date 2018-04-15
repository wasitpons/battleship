const express = require('express');
const router = express.Router();

var fieldController = require('../controllers/fieldController');

router.get('/', (req, res) => {
    res.send({'Hello':'World'});
});

router.get('/getFieldAll', async function (req,res) {
    res.send(await fieldController.getFieldAll());
});

module.exports = router;