const pool = require('./db');

const sendWord = async(fairy_no, epi_no) =>{
    
    const [result] = await pool.query('SELECT eng FROM words WHERE  fairy_no =? AND epi_no = ?', [fairy_no, epi_no]);
    if (result.length === 0) {
        return null;
    }

    let arr = [];
    for (let i = 0; i < result.length; i++) {
        console.log(result[i].eng);
        arr.push(result[i].eng);
    }

    console.log(typeof(arr));

return arr;
}


module.exports = {
    sendWord
};