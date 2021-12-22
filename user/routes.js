const {checkCreateUser, checkEditUser, checkDeleteUser} = require('./lib/middleware')
const handler = require('./handler/main')

function error(err, req, res, next) {
    // log it
    console.error(err.stack);
  
    // respond with 500 "Internal Server Error".
    res.status(500);
    res.send('Internal Server Error');
}

const initRoute = (app) => {
    app.use((req, res, next) => {
        //CORS handling
        res.header('Access-Control-Allow-Origin', process.env.CLIENT_DOMAIN || "*"); 
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, authorization');
        next();
    });
     
    app.get('/', [], (req, res, next) => {
        handler.handleGet(req, res, next)
    })
    
    app.post('/', checkCreateUser(), (req, res, next) => {
        console.log('apa lagi', req.body)
        handler.handleCreate(req, res, next)
    })

    app.put('/', checkEditUser, (req, res, next) => {
        handler.handleUpdate(req, res, next)
    })

    app.delete('/', checkDeleteUser, (req, res, next) => {
        handler.handleDelete(req, res, next)
    })

    app.use(error);
} 
module.exports = {
    initRoute
}