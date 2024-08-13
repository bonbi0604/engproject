const { error } = require('console');
const pool = require('./db');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const login = async(req, id, passwd)=>{
    const my_passwd = crypto.createHash('sha512',2024).update(passwd).digest('base64');
    const my_key = crypto.randomBytes(32).toString('hex');
    try{
        const [result] = await pool.query(
            'SELECT * FROM user WHERE id = ? AND passwd = ?', [id, my_passwd],
        )
        if(result.length >0){
            const token = jwt.sign({id : id}, my_key, {expiresIn : '24h'});
            return {status:201, message : 'Login success', sessionId : req.sessionId, token : token};
        }else{
            return {status:401, message : 'Login failed'};
        }
    }catch(error){
        console.error('db query error', error);
        return {status:500, message : 'server error'};
    }

}

module.exports ={
    login
};

