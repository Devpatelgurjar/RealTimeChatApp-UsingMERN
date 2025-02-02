import express from 'express';
import dotenv from 'dotenv';
import Auth from './routes/auth.routes.js';
import messageRoutes from './routes/message.routes.js';
import path from 'path';
import connectDB from './lib/DB.js';
import cookieparser from "cookie-parser"
import cors from "cors"
import { app,server } from './lib/socket.js';

dotenv.config(); 
// const app = express();

const port = process.env.PORT; 
const __dirname = path.resolve();

//middelware
app.use(express.json({limit:"50mb"}));
app.use(cookieparser());
app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5001"],
    credentials: true,
}));
 
//routes  
app.use('/api/v1/user',Auth); 
app.use('/api/v1/message',messageRoutes);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../Frontend/dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "../Frontend","dist", "index.html"));
    });
  }

app.get('/',(req,res)=>{
    res.send('Hello Developer');
})
 
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    connectDB();
});