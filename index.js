require('dotenv').config();
const {MONGO_URI, PORT, USE_CLUSTER, SESSION_LIMIT} = require('./config/options')
const moment = require('moment');
moment.locale('es');

const express = require('express');
const expressHbs =  require('express-handlebars');
const router = require("./router/index");
const {warnLogger} = require("./utils/logger");

const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');

const parseArgs  = require('minimist');
const args = parseArgs(process.argv.slice(2),  { alias: { m: "MODE"}, default: { MODE: "FORK" } });
const cluster = require(`cluster`);
const os = require(`os`);
const numCPUs = os.cpus().length;

const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');
const MessagesService = require('./services/messagesService');
const messageDTO = require('./dtos/messageDTO');

const app = express();
const httpserver = new HttpServer(app);
const io = new IOServer(httpserver);

const initServer = (PORT) => {
    httpserver.listen(PORT, async () => {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(`Servidor http escuchando en el puerto ${PORT}`)
    });
}

const isCluster = (args.MODE == 'CLUSTER') || USE_CLUSTER;

if (isCluster) {
    if (cluster.isMaster) {
        for (let i = 0; i < numCPUs; i++) {
            cluster.fork();
        }
        cluster.on('exit', worker => {
            console.log('Worker', worker.process.pid, 'died', new Date().toLocaleString())
            cluster.fork();
        });
    } else {
        initServer(PORT);
    }
} else {
    initServer(PORT);
}

/*
const server = app.listen(PORT, async () => {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ecommerce', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
});

server.on('error', () => console.log(`Error: ${err}`));
*/
app.use(cookieParser());
app.use(session({
    store: MongoStore.create({
        mongoUrl: MONGO_URI,
        mongoOptions: advancedOptions,
        collectionName: 'sesiones'
    }),
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: SESSION_LIMIT }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next) {
    if(req.user){
        res.locals.username = req.user.username;
        res.locals.avatar = req.user.avatar;
        res.locals.is_admin = req.user.is_admin;
    }
    next();
});

app.use(flash());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(router);

app.use('*', (req, res) => {
    warnLogger.warn(`Route: ${req.originalUrl} Method: ${req.method} Error: Ruta no implementada`);
    res.render('pages/404', {error: `ruta '${req.originalUrl}' método '${req.method}' no implementada` } );
    //res.send({ error: -2, descripcion: `ruta '${req.originalUrl}' método '${req.method}' no implementada` });
});

const hbs = expressHbs.create({});

// register new function
hbs.handlebars.registerHelper('timeFormat', function(timeFormat, value) {
    return moment(value).format(timeFormat);
})

app.engine('hbs', expressHbs.engine({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials'
}));

app.set('views', './views');
app.set('view engine', 'hbs');

const messageService = new MessagesService;

io.on('connection', async socket => {

    let ms = await messageService.getAllMessages();
    let emitMs;

    if(ms.status === 'success'){
        emitMs = ms.data.map(m => new messageDTO(m));
        io.sockets.emit('messages', emitMs);
    }
    /*
    socket.on('getMessages', async mensaje => {
        ms = await messageService.getAllMessages();
        if(ms.status === 'success'){
            emitMs = ms.data.map(m => new messageDTO(m));
            io.sockets.emit('messages', emitMs);
        }
    })
    */
});