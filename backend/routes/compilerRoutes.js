const express=require('express');
const axios=require('axios');
const router=express.Router();

//defining the routing path
router.post('/run',async (req,res)=>{
    const {language='javascript', code}= req.body;
    const languageMap={//a map of various languages with their judge 0 languageID
        javascript:93,
        python: 71,     
        cpp: 54,        
        c: 50,          
        java: 62        
    };
    if(!languageMap[language]){
        return res.status(400).json({error:'Language not Supported'});
    }
    //configuration of our axios request
    const config={
        method:'POST',
        url:'https://judge0-ce.p.rapidapi.com/submissions',
        params:{
            base64_encoded:'false',
            fields:'*'
        },
        headers:{
            'content-type': 'application/json',
            'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
            'X-RapidAPI-Key': process.env.RAPIDAPI_KEY //api key of from rapid api for authentication
        },
        data:{
            language_id:languageMap[language],
            source_code:code
        }       
    };
    // try catch for request processing
    try {
        const subResponse= await axios.request(config);
        const token=subResponse.data.token;

        let resultResp;
        let statusId=1; //default status id for our loop to run atleast once
        while(statusId===1||statusId===2){
            await new Promise(resolve=>setTimeout(resolve,1500));
            resultResp=await axios.request({
                method:'GET',
                url: `https://judge0-ce.p.rapidapi.com/submissions/${token}`,
                params: {
                    base64_encoded: 'false',
                    fields: '*'
                },
                headers: {
                    'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
                    'X-RapidAPI-Key': process.env.RAPIDAPI_KEY
                }
            });
            statusId=resultResp.data.status.id;
        }
        res.json(resultResp.data);
    }catch(error){
        console.error('Error connecting with Judge 0', error.response ? error.response.data : error.message);
        res.status(500).json({error:'An error occurred while running the code.' });
    }
});

module.exports=router;