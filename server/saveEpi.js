const pool = require('./db');

const saveEpi = async (id, epi_no) => {
    const [rows] = await pool.query(
        'SELECT title FROM episode WHERE epi_no = ?', [epi_no]
    );
    const title = rows[0].title;
    const [result] = await pool.query(
        //progress : progress_no, id, title, epi_no, fairy_no
        'INSERT INTO progress (id, title, epi_no) VALUES (?, ?, ?)',
        [id, title, epi_no]
    );
};
module.exports = {
    saveEpi
};