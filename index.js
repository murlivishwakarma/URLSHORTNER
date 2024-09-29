const express=require("express");
const {connectMongoDB}=require("./connection");
const path=require('path');
const URL=require("./models/url")
const urlRoute=require("./routes/url");
const staticRoute=require("./routes/staticRouter");
const app=express();
app.set("view engine","ejs");
app.set('views',path.resolve('./views'));
const PORT =8001;

connectMongoDB("mongodb://localhost:27017/short-url")
.then(()=> console.log("MongoDb connected"))
.catch(err => console.log("mongoError: ",err));


app.use(express.json())
app.use(express.urlencoded({extended:false}));
app.use("/url",urlRoute);
app.use("/",staticRoute);



app.get("/url/:shortId",async(req,res)=>{
   const  shortId= req.params.shortId;
  const entry= await URL.findOneAndUpdate({
    shortId
   }, {$push:{
             visitHistory:{
                timestamp:Date.now(),
             }
   }})
   res.redirect(entry.redirectURL);
})

app.listen(PORT,()=>console.log(`server started at PORT:${PORT}`));

