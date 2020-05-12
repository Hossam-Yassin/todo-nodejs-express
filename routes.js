
const TODOs_EndPoint = "/todoapp/api/todos";
const TODO_EndPoint = "/todoapp/api/todo";
const HEALTH_EndPoint = "/todoapp/api/health";

module.exports = function(app) {
 
    app.get(TODOs_EndPoint, function(req, res) {
        //Mock Data that retrieved from a store (DB or any model provider)
        var todos = {
            'ID1':'Mocked Completed NodeJS Thread Model' ,
            'ID2':'Mocked Complete overview of Component based design by ReactJS' ,
            'ID3':'Mocked complete POC of Redux (Action , Action creator and Reducer' } ;
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

