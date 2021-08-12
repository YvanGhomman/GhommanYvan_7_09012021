const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const commentCtrl = require('../controllers/comment.controllers.js');


router.post('/',  /* auth, */ commentCtrl.create);
router.get('/', /*auth, */ commentCtrl.findAll);
router.get('/:articleId/comment',  /* auth, */ commentCtrl.findComsWithArticleId);
router.get('/:commentId',  /* auth, */ commentCtrl.findOne);
router.put('/:commentId',  /* auth, */  commentCtrl.update);
router.delete('/:commentId',  /* auth, */ commentCtrl.delete);
/* router.delete('/', auth, commentCtrl.deleteAll);*/


module.exports = router;