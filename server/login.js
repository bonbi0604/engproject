const { error } = require('console');
const pool = require('./db');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

// 랜덤 비밀 키 생성 함수
const generateRandomKey = (length) => {
    return crypto.randomBytes(length).toString('hex');
};

// 비밀 키를 생성하거나 환경 변수에서 가져오기
const my_key = process.env.JWT_SECRET || generateRandomKey(32); // 32바이트 키 생성

const login = async (req, id, passwd) => {
    try {
        const [rows] = await pool.query('SELECT salt FROM user WHERE id = ?', [id]);
        if (rows.length === 0) {
            return { status: 401, message: 'User not found' };
        }
        const salt = rows[0].salt; // salt 값 가져오기
        const my_passwd = crypto.pbkdf2Sync(passwd, salt, 1000, 64, 'sha512').toString('hex');

        const [result] = await pool.query(
            'SELECT * FROM user WHERE id = ? AND passwd = ?', [id, my_passwd]
        );

        if (result.length > 0) {
            const token = jwt.sign({ id: id }, my_key, { expiresIn: '24h' });
            return { status: 201, message: 'Login success', sessionId: id, token: token };
        } else {
            return { status: 401, message: 'Login failed' };
        }
    } catch (error) {
        console.error('DB query error', error);
        return { status: 500, message: 'Server error' };
    }
};

module.exports = {
    login
};