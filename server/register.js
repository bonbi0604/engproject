const pool = require('./db');
const crypto = require('crypto');
const addUser = async (id, passwd) => {
    if (!id || !passwd) {
        throw new Error('ID and password are required.');
    }
    const crypt_passwd = crypto.createHash('sha512',2024).update(passwd).digest('base64');
    const [result] = await pool.query(
        'INSERT INTO user (id, passwd) VALUES (?, ?)',
        [id, crypt_passwd]
    );
    //회원가입 시, 기본으로 해금되도록 progress테이블에 값 추가
    pool.query(
        'INSERT INTO progress(id, title, epi_no, fairy_no) VALUES (?, ?, ?, ?)',
        [id, 'pig',999,1]
    )
    return { insertId: result.insertId, id, passwd };
};
module.exports = {
    addUser
};