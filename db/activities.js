const client = require('./client')

async function createActivity({ name, description }) {
  try {
    const { rows: [activity] } = await client.query(`
        INSERT INTO activities(name, description)
        VALUES($1, $2)
        RETURNING *;
      `, [name, description]);
    if (activity.name === '' || activity.description === '') {
      next({
        name: "IncorrectFieldsError",
        message: "Missing one of the required fields"
      })
    } else {
      return activity;
    }
  } catch (error) {
    throw error;
  }
}

async function updateActivity({ id, name, description }) {
  try {
    const { rows: [activity] } = await client.query(`
            UPDATE activities
            SET name = $2, description = $3
            WHERE id = $1
            RETURNING *
      `, [id, name, description]);
    return activity;
  } catch (error) {
    throw error;
  }
}

async function getAllActivities() {
  try {
    const { rows } = await client.query(`
    SELECT *
    FROM activities
    `)
    return rows
  } catch (error) {
    throw error
  }
}


async function getActivityById(id) {
  try {
    const { rows: [activity] } = await client.query(`
    SELECT * 
    FROM activities
    WHERE id = $1
    `, [id])
    return activity
  } catch (error) {
    throw error
  }
}




module.exports = {
  client,
  createActivity,
  getAllActivities,
  updateActivity,
  getActivityById,

}