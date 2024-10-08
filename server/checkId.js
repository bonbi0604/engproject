const pool = require('./db');

const checkId = async(id) =>{
    if(!id) throw new Error('ID is required.');
    const [rows] = await pool.query('SELECT * FROM user Where id = ?', [id]);
    return rows.length === 0;
}

module.exports ={
    checkId
};