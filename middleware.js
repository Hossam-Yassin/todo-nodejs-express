//A skelton component for handling middleware /filters in the app

const express = require("express");
const fs = require("fs");
const cors = require('cors');
const bodyParser = require('body-parser');

//Logger Filter/MiddleWare
let LoggerFilter = (req, res, next) => { 
    
    let url = req.originalUrl;
    let method = req.method;
    let time = Date(Date.now()).toString();
    
    /**
     * Exclude the LoggerFilter if the URL is , this is not the best practice here ,
     *  it should be managed in a configuration way so no hard code check 
     * **/
    if(url==='/todoapp/api/health'){
        console.log('Excluding the URL from the Logger filter  : ' + url);
        next(); //Check if you could skip the entire chain of middlewar/filters and call diretly the end point 
    }else{         
        next();
        var status = res.statusCode;
        var logStatement = { 'time':time  , url ,method , status };
        fs.appendFile("TODO_logs.txt", JSON.stringify(logStatement) + "\n", err => {
            if (err) {
                //log the error 
           }
       });   
    }
  };


  //Logger Filter/MiddleWare
let securityFilter = (req, res, next) => { 
    /**
     * Exclude the LoggerFilter if the URL is , this is not the best practice here ,
     *  it should be managed in a configuration way so no hard code check 
     * **/
    var fullUrl = req.originalUrl;
    let method = req.method;

    if(fullUrl==='/todoapp/api/health'  || method==='OPTIONS'){
        console.log('Excluding the URL from the security filter  : ' + fullUrl);
        next(); //Check if you could skip the entire chain of middlewar/filters and call diretly the end point 
    }else{
        var GateWay_API_Header = req.headers['x-gateway-apikey'];
        var Cross_Site_Request_Forgery_Header = req.headers['csrf-token'];
        console.log(GateWay_API_Header  + ' && ' + Cross_Site_Request_Forgery_Header);
        if(GateWay_API_Header && Cross_Site_Request_Forgery_Header){ 
            if(GateWay_API_Header=='ConfiguredValue'){
                console.log('Security Filter Header checked passed ');
                next();
            }else{
                console.log('Security Filter Header checked failed due to mismatch API-TOken ');
                res.status(403).send('Forbidden Response');
            }
            
        }else{
            console.log('Security Filter Header checked failed due to missing Api and/or CSRF token ');
            res.status(403).send('Forbidden Response');
        }
    }
  };

module.exports = function(app) {  
    app.use(cors());

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    app.use(securityFilter);
    app.use(LoggerFilter);
}