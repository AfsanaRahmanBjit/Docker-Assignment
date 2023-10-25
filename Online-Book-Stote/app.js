//app.js
const express =  require("express");
const cors =  require("cors");
const app = express();
const path = require('path');
const dotenv = require("dotenv");
const databaseConnection = require("./config/database");
const { logRequest } = require('./middleware/logRequest'); 

const AuthRoute = require("./routes/AuthRoute");
const UserRoute = require("./routes/UserRoute");
const BookRoute = require("./routes/BookRoute");
const TransactionRoute = require("./routes/TransactionRoute");
const CartRoute = require("./routes/CartRoute");
const DiscountRoute = require("./routes/DiscountRoute");
const FeedBackRoute = require("./routes/FeedBackRoute");
const FileRoute=require("./routes/FileRoute");

dotenv.config();
app.use(cors({origin:"*"}));
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({extended:true}));

app.use((err,req,res,next)=>{
   if(err instanceof SyntaxError && err.status===400 && "body" in err){
    return res.status(400).send({message:"Invalid JSON FormData."});
   }
   next();
 });

 app.use('/images', express.static(path.join(__dirname, 'server/images')));

app.use(logRequest);
app.use("/api/v1/auths",AuthRoute);
app.use("/api/v1/users",UserRoute);
app.use("/api/v1/books",BookRoute);
app.use("/api/v1/discounts",DiscountRoute);
app.use("/api/v1/carts",CartRoute);
app.use("/api/v1/transactions",TransactionRoute);
app.use("/api/v1/feedbacks",FeedBackRoute);
app.use("/api/v1/files",FileRoute);

databaseConnection(()=>{
app.listen(8000, () => {
    console.log("Server is running on port 8000");
});
});