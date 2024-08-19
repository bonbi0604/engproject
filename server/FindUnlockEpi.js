const pool = require('./db');

const FindUnlockEpi = async(id, epi_no) =>{
    let result;
    const [tmp] = await pool.query('SELECT * FROM progress WHERE id =? ORDER BY epi_no DESC limit 1', [id]);
    if(tmp && tmp.epi_no !==undefined){
        const epiNo = tmp.epi_no;
        [result] = await pool.query('SELECT * FROM episode WHERE epi_no = ?',[epiNo+1]);
    }else{
        [result] = await pool.query('SELECT * FROM episode WHERE epi_no = ?',[1]);
    }
    return {epi_no: result.epi_no,
            title : result.title,
            content : result.content,
            kor : result.kor,
            fairy_no : result.fairy_no
        }
}

module.exports ={
    FindUnlockEpi
};