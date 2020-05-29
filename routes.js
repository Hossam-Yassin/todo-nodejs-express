/**
 * 
 * This is a route component that handle all routes inside the app , 
 * @TODO : it will be broken down into smaller components later under a route pacakge
**/
const TODOs_LIST_EndPoint = "/todoapp/api/todos";
const TODO_Details_EndPoint = "/todoapp/api/todo/:id([0-9])"; 
const TODO_EndPoint = "/todoapp/api/todo/";

const HEALTH_EndPoint = "/todoapp/api/health";

const TODOItem = require('./model.js');
var cors = require('cors');

var todos_Map = new Map(); // shared items 
var todos_Size=todos_Map.size; //initial value as the size of the todos array

var TODO_STATUS = ["New", "In Progress", "Completed"];
module.exports = function(app) {

    app.options(TODOs_LIST_EndPoint, cors());
    app.get(TODOs_LIST_EndPoint, cors() , function(req, res) {
        var todos = {
                        "todos" : Array.from(todos_Map.values())
                     };
        console.log(todos);
        res.json(todos);
    });

    app.post(TODO_EndPoint, function(req, res) {
       
        var payload = JSON.stringify(req.body);
        console.log(payload);

        const item = new TODOItem(++todos_Size ,JSON.parse(payload).description , "New");
        todos_Map.set(todos_Size.toString() , item);
        res.setHeader('id', todos_Size);
        res.sendStatus(204); 
    });

    app.delete(TODO_Details_EndPoint, function(req, res) {

        var todo = todos_Map.get(req.params.id.toString());
        console.log(req.params.id + ":" + JSON.stringify(todo));
        if(todo=== undefined){
            console.log("Invalid Key : " + req.params.id);
            res.sendStatus(404);  //Resource not found
        }else{
            todos_Map.delete(req.params.id);
            console.log("Key has been deleted successfully : " + req.params.id);
            res.sendStatus(204); //Successfully deleted
        }
    });

    app.put(TODO_Details_EndPoint, function(req, res) {
        var payload = JSON.stringify(req.body);
        console.log(payload);

        var status = JSON.parse(payload).status ;
        
        if ( !(TODO_STATUS.includes(status))) { //validate if the Status is valid
            console.log("Invalid  Status  : " + status);
            res.sendStatus(400);  //Bad Request
        }else{
            var todo = todos_Map.get(req.params.id.toString());
            console.log(req.params.id + ":" + JSON.stringify(todo));
    
            if(todo=== undefined){  //validate the TODO item is already there 
                console.log("TODO is not available to update : " + req.params.id);
                res.sendStatus(404);  //Resource not found
            }else{
                const item = new TODOItem( todo.id ,todo.description, JSON.parse(payload).status);
                todos_Map.delete(req.params.id);
                todos_Map.set(todo.id.toString(), item); //Update the item with the new status
                res.sendStatus(204); //Successfully updated
            }
        }
    });

    app.get(HEALTH_EndPoint, function(req, res) {
        res.send("Place holder for getting the TODO Health")
    });
}