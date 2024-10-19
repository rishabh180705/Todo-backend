import express from 'express';
import connectDB from './Database/index.js';
import auth from './routes/auth.js';
import list from './routes/list.js';
import cors from 'cors'
const app = express();
app.use(cors({ origin:'https://rishabh180705.github.io/' }));

app.use(express.json());
//Routes
app.get('/', (req, res) => {
res.end('Welcome');
});

app.use("/api/v1",auth);
app.use("/api/v2",list);

connectDB();
app.listen(process.env.port,()=>{
    console.log("server started");
})
