const pool = require('./db');

const CollectedWords = async(id) =>{
    let result;
    [result] = await pool.query(
        `SELECT w.eng, w.img 
        FROM collectwords AS cw 
        JOIN words AS w 
        ON cw.epi_no = w.epi_no and cw.fairy_no = w.fairy_no 
        WHERE cw.id =?`, [id]);
    if(result.length===0){
        return {
            eng : 0,
            img : 0
        }
    }
    return {
        eng : result[0].eng,
        img : result[0].img
    }
}
module.exports ={
    CollectedWords
};