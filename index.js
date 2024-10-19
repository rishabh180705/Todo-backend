import express from 'express';
import connectDB from './Database/index.js';
import auth from './routes/auth.js';
import list from './routes/list.js';
import cors from 'cors'
const app = express();

const allowedOrigins = [
    'https://rishabh180705.github.io/profile',
    'https://rishabh180705.github.io/signin',
    'https://rishabh180705.github.io/todo',
    'https://rishabh180705.github.io/signup'
];

app.use(cors({
    origin: function (origin, callback) {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type'
}));

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
