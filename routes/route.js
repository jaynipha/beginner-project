const express = require('express');
const router= express.Router();

router.get('/jennifer', (req, res) =>{
    res.send({title: 'My Express App', message:'hello'})
});

module.exports = router;