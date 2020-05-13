//A skelton component for handling middleware /filters in the app

const express = require("express");
const fs = require("fs");

//Logger Filter/MiddleWare
let LoggerFilter = (req, res, next) => { 
    
    let url = req.url;
    let method = req.method;
    let status = res.statusCode;
    let time = Date(Date.now()).toString();
    
    /**
     * Exclude the LoggerFilter if the URL is , this is not the best practice here ,
     *  it should be managed in a configuration way so no hard code check 
     * **/
    if(url==='/todoapp/api/health'){
        console.log(url);
        next(); //Check if you could skip the entire chain of middlewar/filters and call diretly the end point 
    }else{
        var logStatement = { 'time':time  , url ,method , status };
        console.log(JSON.stringify(logStatement))
    
         fs.appendFile("TODO_logs.txt", JSON.stringify(logStatement) + "\n", err => {
             if (err) {
             console.log(err);
            }
        });
        next();
    }
  };


  //Logger Filter/MiddleWare
let securityFilter = (req, res, next) => { 
    /**
     * Exclude the LoggerFilter if the URL is , this is not the best practice here ,
     *  it should be managed in a configuration way so no hard code check 
     * **/
    let url = req.url;
    if(url==='/todoapp/api/health'){
        console.log(url);
        next(); //Check if you could skip the entire chain of middlewar/filters and call diretly the end point 
    }

    var GateWay_API_Header = req.headers['x-Gateway-ApiKey'];
    var Cross_Site_Request_Forgery_Header = req.headers['csrf-token'];
    console.log(JSON.stringify(GateWay_API_Header));
    console.log(JSON.stringify(Cross_Site_Request_Forgery_Header));
    next();
    // if(GateWay_API_Header!=='Fixed Guide' || Cross_Site_Request_Forgery_Header)
    //     ;
    // else    
    //     
    // }    

  };

module.exports = function(app) {   
    app.use(LoggerFilter);
    app.use(securityFilter);
}