const pool = require('./db');

const saveWords = async (req, res) => {
    const id = req.body.id;       
    const words = req.body.vocabs;

    try{
        for(let i = 0; i < words.length;i++){
            let word = words[i];

            const [rows] = await pool.query(
                'SELECT word_no FROM words WHERE eng = ? ', [word]
            )

            await pool.query(
                'INSERT IGNORE INTO collected_vocab (id, word_no) VALUES \
                (?, ?)', [id, rows[0].word_no]
            )
    }
    }catch(error){
        console.error('Database error:', error);
        res.status(500).json({ message: 'Failed to save words.' });
    }

    // res.send('Episode saved successfully');
};

module.exports = {
    saveWords
};