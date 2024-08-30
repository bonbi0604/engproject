const pool = require('./db');

const Cards = async(eng) =>{
    try{
        const [result] = await pool.query(
            `SELECT kor, img, pronounciation
            FROM words
            WHERE eng = ?`, [eng]);
        if(result.length===0){
            return {
                eng : "0",
                img : "0",
                pronoun : "0"
            }
        }
        return {
            kor : result[0].kor,
            img : result[0].img,
            pronoun : result[0].pronounciation
        }

    }catch(error){
    throw new Error('failed to fetch words');
    }
}
module.exports ={
    Cards
};