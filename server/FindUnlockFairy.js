const pool = require('./db');

const FindUnlockFairy = async(id) =>{
    let result;
    [result] = await pool.query('SELECT fairy_no FROM progress WHERE id =? ORDER BY fairy_no DESC limit 1', [id]);
    
    if(result){
        return { fairy_no: 0 }
    }else{
        return {fairy: result.fairy}
    }
}
module.exports ={
    FindUnlockFairy
};