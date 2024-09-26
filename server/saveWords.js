const pool = require('./db');

const saveWords = async (req, res) => {
    const id = req.body.id;       
    const words = req.body.vocabs;

    if (!words || !Array.isArray(words)) {
        return res.status(400).json({ message: 'Invalid words data.' });
    }

    try {
        for (let i = 0; i < words.length; i++) {
            let word = words[i];

            // 데이터베이스에서 단어 조회
            const [rows] = await pool.query(
                'SELECT word_no FROM words WHERE eng = ?', [word]
            );

            if (rows.length > 0) {
                // word_no가 존재하면 데이터베이스에 삽입
                await pool.query(
                    'INSERT IGNORE INTO collected_vocab (id, word_no) VALUES (?, ?)', 
                    [id, rows[0].word_no]
                );
            } else {
                // 단어가 데이터베이스에 없는 경우 경고 메시지
                console.warn(`Word not found: ${word}`);
            }
        }
        // 모든 단어가 성공적으로 처리되면 응답
        res.status(200).json({ message: 'Words saved successfully.' });
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ message: 'Failed to save words.' });
    }
};

module.exports = {
    saveWords
};