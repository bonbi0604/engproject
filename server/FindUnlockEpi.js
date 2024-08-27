const pool = require('./db');

const FindUnlockEpi = async(id, fairy_no) =>{
    let result;
    [result] = await pool.query('SELECT * FROM progress WHERE id =?  AND fairy_no = ? ORDER BY epi_no DESC limit 1', [id, fairy_no]);
    
    if(result.length===0){
        return { 
            fairy_no: 0,
            total_episode : 0
         }
    }
    const [total_episode] = await pool.query('SELECT COUNT(*) FROM episode WHERE fairy_no=?', [fairy_no]);
    return {
        fairy_no: result.fairy_no,
        total_episode : total_episode.count
    }
}
module.exports ={
    FindUnlockEpi
};