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
        [id, 'The Three Little Pigs',1,1]
    )
    return { insertId: result.insertId, id, passwd };

    // Salt 생성
    const salt = crypto.randomBytes(16).toString('hex');
    // 비밀번호 해싱
    const crypt_passwd = crypto.pbkdf2Sync(passwd, salt, 1000, 64, 'sha512').toString('hex');

    try {
        // 사용자 정보를 데이터베이스에 추가
        const [result] = await pool.query(
            'INSERT INTO user (id, passwd, salt) VALUES (?, ?, ?)',
            [id, crypt_passwd, salt]
        );

        // 회원가입 시 기본 progress 정보 추가
        await pool.query(
            'INSERT INTO progress(id, title, epi_no, fairy_no) VALUES (?, ?, ?, ?)',
            [id, 'pig', 999, 1]
        );

        return { insertId: result.insertId, id, passwd };
    } catch (error) {
        console.error('Error inserting user:', error);
        throw new Error('Failed to add user');
    }
};

module.exports = {
    addUser
};
