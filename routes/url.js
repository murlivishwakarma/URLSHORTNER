
const express=require("express");
const {handleGenerateNewShortURL,handleGetAnalytics}=require("../controller/url");
const router=express.Router();

console.log("route");
router.post("/",handleGenerateNewShortURL);

router.get("/analytics/:shortId",handleGetAnalytics);

module.exports=router;