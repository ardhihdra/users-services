const bodyParser = require('body-parser')

const { checkRegister } = require('./lib/middleware')
const handler = require('./handler/main')

function error(err, req, res, next) {
    // log it
    console.error(err.stack);
  
    // respond with 500 "Internal Server Error".
    res.status(500);
    res.send('Internal Server Error');
}

const initRoute = (app) => {
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))

    app.use((req, res, next) => {
        //CORS handling
        res.header('Access-Control-Allow-Origin', process.env.CLIENT_DOMAIN || "*"); 
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, authorization');
        res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, OPTIONS, DELETE');
        next();
    });

    app.get('/', (req, res, next) => {
        res.json({status: true})
    })
     
    app.post('/register', checkRegister(), (req, res, next) => {
        handler.handleRegister(req, res, next)
    })
    
    app.post('/login', [], (req, res, next) => {
        handler.handleLogin(req, res, next)
    })

    app.post('/token', [], (req, res, next) => {
        handler.handleToken(req, res, next)
    })

    app.post('/token/revoke', [], (req, res, next) => {
        handler.handleRevokeToken(req, res, next)
    })

    app.get('/logout', [], (req, res, next) => {
        handler.handleLogout(req, res, next)
    })

    app.post('/authorization', [], (req, res, next) => {
        handler.handleAuth(req, res, next)
    })

    app.use(error);
}

module.exports = {
    initRoute
}