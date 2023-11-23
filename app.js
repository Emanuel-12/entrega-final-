const  express=require( 'express');
const  cors =require( 'cors')
const  morgan =require( 'morgan')
const  fileUpload =require( 'express-fileupload');

const  usuarioRouter =require( './router/usuariosRouter.js')
const  adminRouter =require( './router/adminRouter.js');
const  clienteRouter =require( './router/clienteRouter.js');
const  peliculaRouter =require( './router/peliculaRouter.js');
const  serieRouter =require( './router/serieRouter.js');
const  {DB_MONGOATLAS,SESSION_SECRET} =require( './config.js');
const  expressSession =require( 'express-session');
const  MongoDBStore =require( 'connect-mongodb-session')
const  handlebars =require( 'express-handlebars');
const  { fileURLToPath } =require( 'url');

const path=require('path')

const app=express()

app.use(express.json())
const MongoDBStoreSession = MongoDBStore(expressSession);

app.engine('.hbs',handlebars.engine({extname:'.hbs',defaultLayout:'main.hbs'}));
app.set('view engine','hbs');
app.set('views','./views');



app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin:'*',
}))
app.use(morgan('dev'))
app.use(express.json())
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: './tmp',
    safeFileNames: true, 
    preserveExtension: true 
}))

const store = new MongoDBStoreSession ({
    uri: DB_MONGOATLAS,
    collection: 'sessions2'
})
app.use(expressSession({
    name: 'session',
    resave: false,
    saveUninitialized: false,
    secret: SESSION_SECRET,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60 * 24,
    },
    store: store
}))

app.use(express.static(path.join(__dirname, 'public')));



app.use('/usuario',usuarioRouter)
app.use('/admin', adminRouter);
app.use('/cliente', clienteRouter);
app.use('/peliculas', peliculaRouter);
app.use('/series', serieRouter);
app.get('/*', (req, res) => {
    res.redirect('/usuario/login');
})
module.exports=app




