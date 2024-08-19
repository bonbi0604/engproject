const pool = require('./db');

const FindUnlockEpi = async(id, fairy_no) =>{
    let result;
    [result] = await pool.query('SELECT * FROM progress WHERE id =?  AND fairy_no = ? ORDER BY epi_no DESC limit 1', [id, fairy_no]);
    
    if(result){
        return { epi_no: 0 }
    }else{
        return {epi_no: result.epi_no}
    }
}

module.exports ={
    FindUnlockEpi
};