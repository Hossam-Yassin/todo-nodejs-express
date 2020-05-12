/**
 * This is a route component that handle all routes inside the app , 
 * it will be broken down into smaller component later under a route pacakge
**/
const TODOs_EndPoint = "/todoapp/api/todos";
const TODO_EndPoint = "/todoapp/api/todo";
const HEALTH_EndPoint = "/todoapp/api/health";
const HOME_EndPoint = "/";

module.exports = function(app) {
    
    //Here is the entry point where you start the navigation
    app.get(HOME_EndPoint, function(req, res) {
        res.send("Home Page")
    });

    app.get(TODOs_EndPoint, function(req, res) {
        res.send("Place holder for getting all todos ");
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