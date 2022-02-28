const express = require('express')
const router = express.Router()
const LoanController = require('../controllers/loan.controller')

router.get('/', LoanController.findAll);
router.post('/', LoanController.create);
router.get('/:id', LoanController.findOne);
router.put('/:id', LoanController.update);
router.delete('/:id',LoanController.deleteItem);



module.exports = router;