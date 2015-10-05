import express from 'express';
import path from 'path';

const app = express();
const port = 8001;

app.use(express.static('./dist'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
