import express from 'express';
import morgan from 'morgan';
import cors   from 'cors';
import helmet from 'helmet';
import routes from './routes/user_routes.js'
// console.log(express());

const app = express();
const port = 5000;


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));
app.use(helmet())
app.use(cors());
app.use('/api' , routes)


app.listen(port , ()=>{
    console.log(`Server listen to the port ${port}`);
})


