/**
 * 
 * This is a route component that handle all routes inside the app , 
 * @TODO : it will be broken down into smaller components later under a route pacakge
**/
const TODOs_EndPoint = "/todoapp/api/todos";
const TODO_EndPoint = "/todoapp/api/todo";
const HEALTH_EndPoint = "/todoapp/api/health";
const HOME_EndPoint = "/";

var cors = require('cors');

module.exports = function(app) {
    
    //Here is the entry point where you start the navigation
    app.get(HOME_EndPoint, function(req, res) {
        res.send("Home Page")
    });

    app.options(TODOs_EndPoint, cors());
    app.get(TODOs_EndPoint, cors() , function(req, res) {
        //Mock Data that retrieved from a store (DB or any model provider)
        var todos = {
            "todos" : [
                {"ID":'1' , "Description" : "Mocked Complete overview of NodeJS Event Loop" , "Status":"Complete"} ,
                {"ID":"2" , "Description" : "Mocked Complete overview of Component based design by ReactJS" , "Status":"Complete"} ,
                {"ID":'3' , "Description" : "Mocked complete POC of Redux (Action , Action creator and Reducer" , "Status":"New"}
                ]
            };
        console.log(todos);
        res.json(todos);
    });

    app.get(TODO_EndPoint, function(req, res) {
        res.send("Place holder for getting a detailed TODO")
    });

    app.post(TODO_EndPoint, function(req, res) {
        res.send("Place holder for adding new TODO  ")
    });

    app.delete(TODO_EndPoint, function(req, res) {
        res.send("Place holder for deleting a TODO")
    });

    app.patch(TODO_EndPoint, function(req, res) {
        res.send("Place holder for patching a TODO")
    });

    app.get(HEALTH_EndPoint, function(req, res) {
        res.send("Place holder for getting the TODO Health")
    });
}