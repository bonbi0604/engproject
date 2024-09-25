const { error } = require('console');
const pool = require('./db');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

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