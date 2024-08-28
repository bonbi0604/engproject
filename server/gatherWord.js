const pool = require('./db');

const gatherWord = async (id, eng, epi_no, fairy_no) => {
    const [result] = await pool.query(
        'INSERT INTO collectwords (id, eng, fairy_no, epi_no) VALUES (?, ?, ?, ?)',
        [id, eng, fairy_no, epi_no]
    );
    //return 안함
};
module.exports = {
    gatherWord
};