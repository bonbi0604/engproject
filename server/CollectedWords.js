const pool = require('./db');

const CollectedWords = async(id) =>{
    try{
        const [result] = await pool.query(
            `SELECT w.eng, w.img
            FROM collected_vocab AS cv
            JOIN words AS w
            ON cv.word_no = w.word_no
            WHERE cv.id =?`, [id]);
        if(result.length===0){
            return {
                eng : 0,
                img : 0
            }
        }
        return result.map(row=>({
            eng : row.eng,
            img : row.img
        }))

    }catch(error){
    throw new Error('failed to fetch words');
    }
}
module.exports ={
    CollectedWords
};