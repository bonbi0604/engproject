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
    return { insertId: result.insertId, id, passwd };
};
module.exports = {
    addUser
};