const pool = require('./db');

const sendWord = async(fairy_no, epi_no) =>{
    
    const [result] = await pool.query('SELECT eng FROM words WHERE  fairy_no =? AND epi_no = ?', [fairy_no, epi_no]);
    if (result.length === 0) {
        return { 
            fairy_no: null,
            total_episode : null
        }
    }
    console.log(result);
    return [result]
}


module.exports = {
    sendWord
};