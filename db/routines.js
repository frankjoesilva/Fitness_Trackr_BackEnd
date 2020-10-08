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

  
async function updateRoutine({ id, ...fields }) {
  const setString = Object.keys(fields).map(
    (key, index) => `"${ key }"=$${ index + 1 }`
    ).join(', ');
  const objValues = Object.values(fields)
    if(setString.length === 0){
      return;
    }
    objValues.push(id)
  try {
    const { rows: [routine]  } = await client.query(`
      UPDATE routines
      SET ${ setString }
      WHERE id = $${objValues.length}
      RETURNING *;
    `, objValues);
    return routine;
  } catch (error) {
    throw error;
  }
}


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
    updateRoutine,
    destroyRoutine,
}