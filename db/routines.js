const client = require('./client')

async function createRoutine({ creatorId, isPublic, name, goal }) {
    try {
        const { rows: [routine] } = await client.query(`
        INSERT INTO Routines("creatorId", "isPublic", name, goal)
        VALUES($1, $2, $3, $4)
        RETURNING *;
      `, [ creatorId, isPublic, name, goal ]);
      return routine;
    } catch (error) {
      throw error;
    }
  }

  

  async function getRoutinesWithoutActivities() {
    try {
        const { rows } = await client.query(`
        SELECT *
        FROM Routines;
      `);
      return rows
    } catch (error) {
      throw error;
    }
  }

  async function getRoutineById(id){
    try{
      const {rows:[routine]} = await client.query(`
      SELECT * FROM routines
      WHERE id = $1
      `, [id]);
      return routine
    } catch(error){
      throw error
    }
  }

  async function getActivityById(id){
    try{
      const{rows:[activity]} = await client.query(`
      SELECT * 
      FROM Activities
      WHERE id = $1
      `, [id])
      return activity 
    }catch(error){
      throw error 
    }
  }

  async function updateRoutine({ id, isPublic, name, goal }) {
    try {
      const { rows: [routine]  } = await client.query(`
        UPDATE routines
        SET "isPublic" = $2, name = $3, goal = $4
        WHERE id = $1
        RETURNING *;
      `,[id, isPublic, name, goal]);
      return routine;
    } catch (error) {
      throw error;
    }
}

  // async function getAllRoutines(){
  //     const { rows:  } = await client.query(`
  //     SELECT *
  //     FROM Routines;
  //     `);

  // }

  async function destroyRoutine(id){
    try{
     await client.query(`
      DELETE 
      FROM routines
      WHERE id = $1
      `, [id]);
    }catch(error){
      throw error
    }
  }

 

module.exports = {
    client,
    createRoutine,
    getRoutinesWithoutActivities,
    getRoutineById,
    getActivityById,
    updateRoutine,
    destroyRoutine,
}