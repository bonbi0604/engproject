const pool = require('./db');

const sendWord = async(fairy_no, epi_no) =>{
    
    const [result] = await pool.query('SELECT eng FROM words WHERE  fairy_no =? AND epi_no = ?', [fairy_no, epi_no]);
    if (result.length === 0) {
        return null;
    }

    let arr = [];
    for (let i = 0; i < result.length; i++) {
    arr.push(result[i].eng);
}

return arr;
}


module.exports = {
    sendWord
};