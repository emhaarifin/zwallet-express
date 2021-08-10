import connection from '../configs/db.js';
import { promiseResolveReject } from '../helpers/helpers.js';

const insertDataTopup = (data) => new Promise((resolve, reject) => {
  connection.query('INSERT INTO transactions SET ?', data, (err, result) => {
    promiseResolveReject(resolve, reject, err, result);
  });
});

const insertImageTopup = (filename, invoiceNumber) => new Promise((resolve, reject) => {
  connection.query(
    'UPDATE transaction SET image_topup = ? WHERE invoice_number = ?',
    [filename, invoiceNumber],
    (err, result) => {
      promiseResolveReject(resolve, reject, err, result);
    },
  );
});

const getAllTransaction = () => new Promise((resolve, reject) => {
  connection.query('SELECT * FROM transactions', (err, result) => {
    promiseResolveReject(resolve, reject, err, result);
  });
});

const updatetransaction = (status, transactionId) => new Promise((resolve, reject) => {
  connection.query(
    'UPDATE transactions SET status = ? WHERE transaction_id = ?',
    [status, transactionId],
    (err, result) => {
      promiseResolveReject(resolve, reject, err, result);
    },
  );
});

const transfer = (dataTransfer, next) => new Promise((resolve, reject) => {
  // Transaction
  const dataTransaction = {
    invoice_number: dataTransfer.invoice_number,
    user_id: dataTransfer.user_id,
    transaction_type: dataTransfer.transaction_type,
    status: 'approve',
    amount: dataTransfer.amount,
    description: dataTransfer.description,
  };
  connection.query('INSERT INTO transactions SET ?', dataTransaction, (err) => {
    if (err) {
      next(err);
    } else {
      // Transaction reciever
      connection.query(
        'SELECT * FROM transactions WHERE invoice_number = ?',
        dataTransfer.invoice_number,
        // eslint-disable-next-line no-shadow
        (err, result) => {
          if (err) {
            next(err);
          } else {
            connection.query(
              'INSERT INTO transactions_reciever SET transaction_id = ?, user_id = ?',
              [result[0].transaction_id, dataTransfer.user_reciever],
              // eslint-disable-next-line no-shadow
              (err, result) => {
                promiseResolveReject(resolve, reject, err, result);
              },
            );
          }
        },
      );
    }
  });
});
export default {
  insertDataTopup,
  insertImageTopup,
  updatetransaction,
  getAllTransaction,
  transfer,
};
