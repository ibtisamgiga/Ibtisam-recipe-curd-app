const express = require('express');
const mongoose = require('mongoose');
const authRoutes=require('./routes/authRoutes')
const blogsRoutes=require('./routes/blogRoutes')
const cookieParser=require('cookie-parser')
const{requireAuth, checkUser}=require('./middleware/authmiddleware')
const app = express();

// middleware
app.use(express.static('public'));

// view engine
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cookieParser())


// database connection
const dbURI = 'mongodb+srv://nodeauth:Abcd@auth-project.s8vdann.mongodb.net/auth-project';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => {app.listen(5000)
    console.log('db connected')
  
  })
  .catch((err) => console.log(err));

// routes
app.get('*',checkUser)
app.get('/',(req, res) => res.render('home'));
app.get('/smoothies',requireAuth, (req, res) => res.render('smoothies'));
app.get('/about', requireAuth,(req, res) => res.render('about'));
app.get('/blogs/create',requireAuth, (req, res) => res.render('create'));
app.get('/blogs-update/:id',requireAuth, (req, res) => res.render('update',{ bid:req.params.id }));


app.use(authRoutes)

app.use('/blogs',blogsRoutes)


/*************************************************COOKIES****************************************/

app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
 });


