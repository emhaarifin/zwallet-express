import express from 'express';
import resultOfValidation from '../validations/ValidationResult.js';
import ControllerMain from '../controllers/ControllerMain.js';
import { Auth, Role } from '../middlewares/Auth.js';
import {
  topUpFieldRules, rulesFileUploud, rulesCreateImgTopUp, statusRules, transferFielfRules, checkpin,
} from '../validations/MainValidation.js';

const router = express.Router();

router
  .get('/gettransactions', Auth, Role('member', 'admin'), ControllerMain.getAllTransaction)
  .post('/topup', Auth, Role('member'), rulesFileUploud, rulesCreateImgTopUp(), topUpFieldRules(), resultOfValidation, ControllerMain.topUp)
  .post('/updatetransaction', Auth, Role('admin'), statusRules(), resultOfValidation, ControllerMain.updatetransaction)
  .post('/transfer', Auth, Role('member'), transferFielfRules(), resultOfValidation, ControllerMain.transfer)
  .post('/cekpin', Auth, Role('member'), checkpin(), resultOfValidation, ControllerMain.checkPIN);
export default router;
