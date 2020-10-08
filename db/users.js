const client = require('./client');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const { JWT_SECRET } = process.env
const SALT_COUNT = 10

async function createUser({ 
    username, 
    password
  }) {
    try {
      const { rows: [ user ] } = await client.query(`
      INSERT INTO Users(username, password) 
      VALUES($1, $2) 
      ON CONFLICT (username) DO NOTHING 
      RETURNING *;
      `, [username, password]);
      delete user.password
      return user;
    } catch (error) {
      throw error;
    }
  }

 async function getUser({username, password}){
   try{
     const {rows:user} = await client.query(`
     SELECT username, password
     FROM Users
     WHERE username=$1
     AND password=$2;
     `, [username, password])
    if( user.password === password && user.username === username){
      delete user.password
    }
    return user
   }catch(error){
     throw error
   }
 }

async function getUserById(userId) {
  try {
    const { rows: [ user ] } = await client.query(`
      SELECT *
      FROM Users
      WHERE id=${ userId }
    `);
    delete user.password
    return user;
  } catch (error) {
    throw error;
  }
}

  module.exports = {
    client,
    createUser,
    getUserById,
    getUser,
   
  }