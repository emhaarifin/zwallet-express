const express = require('express');
const resultOfValidation = require('../validations/ValidationResult');
const ControllerMain = require('../controllers/ControllerMain');
const { Auth, Role } = require('../middlewares/Auth');
const {
  topUpFieldRules,
  rulesFileUploud,
  rulesCreateImgTopUp,
  statusRules,
  transferFielfRules,
  checkpin,
} = require('../validations/MainValidation');

const router = express.Router();

router
  .get('/gettransactions', Auth, Role('member', 'admin'), ControllerMain.getAllTransaction)
  .get('/showtransaction/:transactionId', Auth, Role('member', 'admin'), ControllerMain.showtransaction)
  .post(
    '/topup',
    Auth,
    Role('member'),
    rulesFileUploud,
    rulesCreateImgTopUp(),
    topUpFieldRules(),
    resultOfValidation,
    ControllerMain.topUp,
  )
  .get('/gettopup', Auth, Role('admin'), ControllerMain.getTopup)
  .post('/updatetransaction', Auth, Role('admin'), statusRules(), resultOfValidation, ControllerMain.updatetransaction)
  .post('/transfer', Auth, Role('member'), transferFielfRules(), resultOfValidation, ControllerMain.transfer)
  .post('/cekpin', Auth, Role('member'), checkpin(), resultOfValidation, ControllerMain.checkPIN);

module.exports = router;
