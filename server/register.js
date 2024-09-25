const pool = require('./db');
const crypto = require('crypto');
const addUser = async (id, passwd) => {
    if (!id || !passwd) {
        throw new Error('ID and password are required.');
    }
    const salt = crypto.randomBytes(16).toString('hex')
    const crypt_passwd = crypto.pbkdf2Sync(passwd, salt, 1000, 64, 'sha512').toString('hex');

    const [result] = await pool.query(
        'INSERT INTO user (id, passwd, salt) VALUES (?, ?, ?)',
        [id, crypt_passwd, salt]
    );
    //회원가입 시, 기본으로 해금되도록 progress테이블에 값 추가
    pool.query(
        'INSERT INTO progress(id, title, epi_no, fairy_no) VALUES (?, ?, ?, ?)',
        [id, 'The Three Little Pigs',1,1]
    )
    return { insertId: result.insertId, id, passwd };
};
module.exports = {
    addUser
};