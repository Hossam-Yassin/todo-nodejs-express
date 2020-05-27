class TODOItem{
    
    constructor(id, description , status) { 
        this.id = id; 
        this.description = description;
        this.status = status; 
     } 

     setStatus(status){
        this.status=status;
     }

}

module.exports = TODOItem ;