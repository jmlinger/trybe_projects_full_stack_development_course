const express = require('express');
const rescue = require('express-rescue');
const auth = require('../../middlewares/auth');

const router = express.Router({ mergeParams: true });

router.post('/', auth, rescue(require('./create')));

router.get('/', rescue(require('./list')));

router.get('/:id', rescue(require('./get')));

router.put('/:id', auth, rescue(require('./update')));

router.delete('/:id', auth, rescue(require('./remove')));

module.exports = router;
