require('dotenv').config() // .env 파일 내용 로드
const express = require('express')
const {addUser} = require('./register')
const {checkId} = require('./checkId');
const session = require('express-session');
const {login} = require('./login');
const crypto = require('crypto');
const app = express();
const port = 3306;


const sessionSecret = crypto.randomBytes(128).toString('base64');
process.env.SESSION_SECRET = sessionSecret || process.env.SESSION_SECRET;

//session 설정
app.use(session({
    secret :'process.env.SESSION_SECRET',
    resave : false,
    saveUninitialized : true,
    cookie : {secure : false}
}));

app.use(express.json());

app.post('/login', async(req, res)=>{
    const { id, passwd} = req.body;
    if (!id || !passwd) {
        return res.status(400).json({ message: 'ID and password are required.' });
    }
    const result = await login(id, passwd);
    return res.status(result.status).json({message:result.message});
});


// app.post('./logout', logInOut.logout);
// app.get('/loginboard', logInOut.Auth, (req, res)=>{
//     res.json({"message" : 'Welcom ${req.session.user}!'});
// });

app.post('/addUsers', async (req, res) => {
    const { id, passwd } = req.body;
    if (!id || !passwd) {
        return res.status(400).json({ message: 'ID and password are required.' });
    }
    try {
        const result = await addUser(id, passwd);
        res.status(201).json({ id: result.insertId, id, passwd });
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ message: 'Failed to add user.' });
    }
});

app.get('/checkId', async(req, res)=>{
   const { id } = req.query;

   try{
    const result = await checkId(id);
    res.status(200).json(result);
   } catch(error){
        console.error('db error: ', error);
        res.status(500).json({message : 'error'});
   }
});


app.listen(port, () => {
    console.log(`서버 열었어! ${port}`);
});