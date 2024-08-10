const { error } = require('console');
const pool = require('./db');
const crypto = require('crypto');

const login = async(id, passwd)=>{
    const my_passwd = crypto.createHash('sha512',2024).update(passwd).digest('base64');
    try{
        const [result] = await pool.query(
            'SELECT * FROM user WHERE id = ? AND passwd = ?', [id, my_passwd],
        )
        if(result.length >0){
            return {status:201, message : 'Login success'};
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

// function logout(req, res){
//     req.session.destroy(err =>{
//         if(err){
//             return res.status(500).send('로그아웃 오류');
//         }
//         res.send('로그아웃 했습니다.')
//     });
// }

// function Auth(req, res, next){
//     if(req.session.user){
//         return next();
//     }else{
//         res.status(401).json({message : '로그인 해주세요'});
//     }
// }
