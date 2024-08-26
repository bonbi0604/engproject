const pool = require('./db');

const FindUnlockFairy = async(id) =>{
    let result;
    [result] = await pool.query('SELECT fairy_no FROM progress WHERE id =? ORDER BY fairy_no DESC limit 1', [id]);
    if(!result){
        return { 
            fairy_no: 0,
            total_episode : 0
         }
    }
    const [total_episode] = await pool.query('SELECT COUNT(*) FROM episode WHERE fairy_no=?', [result.fairy_no]);
        return {
            fairy_no: result.fairy_no,
            total_episode : total_episode.count
        }
    
}
module.exports ={
    FindUnlockFairy
};