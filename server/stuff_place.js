const pool = require('./db');

const stuff_place = async(id) =>{
    const [result] = await pool.query(`
        SELECT eng FROM words 
        WHERE word_no = (
            SELECT word_no FROM collected_vocab 
            WHERE id = ? AND place = FALSE
        )
    `, [id]);
    
    return result;
}
module.exports = {
    stuff_place
};