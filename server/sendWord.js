const pool = require('./db');

const sendWord = async(fairy_no, epi_no) =>{
    const [result] = await pool.query('SELECT eng FROM words WHERE fairy_no = ? AND epi_no = ?', [fairy_no, epi_no]);
    list = [];
    if (result.length === 0) {
        return null;
    }
    for(i=0;i < result.length;i++){
        list.push(result[i].eng);
    }
    return list;
}


module.exports = {
    sendWord
};