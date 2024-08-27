const pool = require('./db');

const FindUnlockEpi = async(id, fairy_no) =>{
    let result;
    [result] = await pool.query('SELECT * FROM progress WHERE id =? AND fairy_no = ? ORDER BY epi_no DESC limit 1', [id, fairy_no]);
    
    if (result.length === 0) {
        return { 
            fairy_no: 0,
            total_episode : 0
        }
    }

    const [total_episode] = await pool.query('SELECT COUNT(*) as count FROM episode WHERE fairy_no = ?', [fairy_no]);

    return { 
        fairy_no: result[0].fairy_no,
        total_episode : total_episode[0].count
    }
}

module.exports = {
    FindUnlockEpi
};