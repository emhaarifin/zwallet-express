import connection from '../configs/db.js';
import { promiseResolveReject } from '../helpers/helpers.js';

const register = (data) => new Promise((resolve, reject) => {
  connection.query('INSERT INTO users SET ?', data, (err, result) => {
    promiseResolveReject(resolve, reject, err, result);
  });
});

const checkExistUser = (fieldValue, field) => new Promise((resolve, reject) => {
  connection.query(`SELECT * FROM users where ${field} = ?`, fieldValue, (error, result) => {
    promiseResolveReject(resolve, reject, error, result);
  });
});

const activateAccount = (email) => new Promise((resolve, reject) => {
  connection.query('UPDATE users SET email_verified = 1 WHERE email = ?', email, (err, result) => {
    promiseResolveReject(resolve, reject, err, result);
  });
});

const createPIN = (pin, email) => new Promise((resolve, reject) => {
  connection.query('UPDATE users SET PIN = ? WHERE email = ?', [pin, email], (err, result) => {
    promiseResolveReject(resolve, reject, err, result);
  });
});

const changePassword = (data, id) => new Promise((resolve, reject) => {
  connection.query('UPDATE users SET ? WHERE user_id = ?', [data, id], (err, result) => {
    promiseResolveReject(resolve, reject, err, result);
  });
});

const getUser = () => new Promise((resolve, reject) => {
  connection.query('SELECT * FROM users', (error, result) => {
    promiseResolveReject(resolve, reject, error, result);
  });
});

const updateSaldo = (saldo, userId) => new Promise((resolve, reject) => {
  connection.query('UPDATE users SET saldo = ? WHERE user_id = ?', [saldo, userId], (err, result) => {
    promiseResolveReject(resolve, reject, err, result);
  });
});

const readUser = (search, order, fieldOrder, userLogin, start = '', limit = '') => new Promise((resolve, reject) => {
  if (limit !== '' && start !== '') {
    connection.query(
      `SELECT * FROM users WHERE 
      (first_name LIKE "%${search}%" OR last_name LIKE "%${search}%" OR phone_number LIKE "%${search}%" OR email LIKE "%${search}%"
      OR fullname LIKE "%${search}%") AND user_id != ${userLogin}
      ORDER BY ${fieldOrder} ${order} LIMIT ${start} , ${limit}`,
      (error, result) => {
        promiseResolveReject(resolve, reject, error, result);
      },
    );
  } else {
    connection.query(
      `SELECT * FROM users WHERE 
      (first_name LIKE "%${search}%" OR last_name LIKE "%${search}%" OR phone_number LIKE "%${search}%" OR email LIKE "%${search}%"
      OR fullname LIKE "%${search}%") AND user_id != ${userLogin}
      ORDER BY ${fieldOrder} ${order}`,
      (error, result) => {
        promiseResolveReject(resolve, reject, error, result);
      },
    );
  }
});

export default {
  register,
  checkExistUser,
  activateAccount,
  createPIN,
  changePassword,
  getUser,
  updateSaldo,
  readUser,
};
