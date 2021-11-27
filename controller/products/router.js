const express = require('express');

const router = express.Router({ mergeParams: true });

router.get('/', require('./list'));

router.get('/:id', require('./get'));

router.post('/', require('./create'));

module.exports = router;
