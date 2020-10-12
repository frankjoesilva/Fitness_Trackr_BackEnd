const client = require('./client');
const bcrypt = require('bcrypt');
const SALT_COUNT = 10

async function createUser({ 
  username, 
  password
}) {
  try {
    const hashedPassword = await bcrypt.hash(password, SALT_COUNT)
      const { rows: [ user ] } = await client.query(`
      INSERT INTO users(username, password) 
      VALUES($1, $2) 
      ON CONFLICT (username) DO NOTHING 
      RETURNING *;
      `, [username, hashedPassword]);
      delete user.password
      return user;
    } catch (error) {
      throw error;
    }
  }
  

 async function getUser({username, password}){
   try{
     const {rows:[user]} = await client.query(`
     SELECT *
     FROM users
     WHERE username=$1;
     `, [username])
    const isAMatch = await bcrypt.compare(password, user.password); 
    if(isAMatch){
      delete user.password
      return user
    }
   }catch(error){
     throw error
   }
 }

async function getUserById(userId) {
  try {
    const { rows: [ user ] } = await client.query(`
      SELECT *
      FROM users
      WHERE id=$1
    `, [userId]);
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