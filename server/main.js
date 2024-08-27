require('dotenv').config() // .env 파일 내용 로드
const express = require('express')
const {addUser} = require('./register')
const {checkId} = require('./checkId');
const session = require('express-session');
const {login} = require('./login');
const {FindUnlockEpi} = require('./FindUnlockEpi')
const {FindUnlockFairy} = require('./FindUnlockFairy')
const {saveEpi} = require('./saveEpi')
const crypto = require('crypto');
const app = express();
const port = 3306;


const sessionSecret = crypto.randomBytes(128).toString('base64');
process.env.SESSION_SECRET = sessionSecret || process.env.SESSION_SECRET;


app.use(express.json());

app.post('/login', async(req, res)=>{
    const { id, passwd} = req.body;
    if (!id || !passwd) {
        return res.status(400).json({ message: 'ID and password are required.' });
    }
    const result = await login(req, id, passwd);
    return res.status(result.status).json({
        status: result.status, 
        message:result.message, 
        sessionId : result.sessionId,
        token : result.token});
});

app.post('/saveEpi', async(req, res)=>{
    const {id, epi_no} = req.body;
    try{
        const result = await saveEpi(id, epi_no);
        if(result.success){
            res.status(200).json({message : 'Episode saved'});
        }else{
            res.status(500).json({message:'Episode save failed'})
        }
    }catch(error){
        res.status(500).json({message: 'ERROR OCCURED', error: error.message})
    }
});


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

app.get('/FindUnlockEpi', async(req, res)=>{
    const {id, fairy_no} = req.query;
    try{
        const result = await FindUnlockEpi(id, fairy_no);
        res.status(200).json({
            epi_no: result.epi_no
        })
    }catch(error){
        console.error('episode unlock error : ', error);
        res.status(500).json({ error: 'An error occurred while fetching the episode.' });
    }
});

app.get('/FindUnlockFairy', async(req, res)=>{
    const {id} = req.query; //get방식은 query라고 함
    try{
        const result = await FindUnlockFairy(id);
        res.status(200).json({
            fairy_no: result.fairy_no,
            total_episode : result.total_episode
        })
    }catch(error){
        console.error('오류 뜰 수가 없음', error);
        res.status(500).json({ error: 'An error occurred while find FAIRYTALE.' });
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