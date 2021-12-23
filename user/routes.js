const { isRole, checkCreateUser, checkGetUser} = require('./lib/middleware')
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
        res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, OPTIONS, DELETE');
        next();
    });
     
    app.get('/:_id?', checkGetUser, (req, res, next) => {
        handler.handleGet(req, res, next)
    })
    
    app.post('/', checkCreateUser(), (req, res, next) => {
        handler.handleCreate(req, res, next)
    })

    app.put('/', isRole('admin'), (req, res, next) => {
        handler.handleUpdate(req, res, next)
    })

    app.delete('/:_id', isRole('admin'), (req, res, next) => {
        handler.handleDelete(req, res, next)
    })

    app.use(error);
} 
module.exports = {
    initRoute
}