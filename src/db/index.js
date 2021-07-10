const dbClient = require('monk')('mongodb+srv://kuldeep:root@cluster0.flxco.mongodb.net/nutrify?retryWrites=true&w=majority');
module.exports=dbClient;  

