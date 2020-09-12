const express = require('express');
const router = express.Router()
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
const categoryRoutes = require('./routes/category')
const productRoutes = require('./routes/product')

// DB connections

mongoose.connect(process.env.DATABASE,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex:true
}).then(() => {
    console.log('DB CONNECTION SUCCESS')
})

//Static files
app.use('/uploads', express.static('uploads'));// Middle wares
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())

// MY ROUTES

app.use('/api', authRoutes)
app.use('/api', userRoutes)
app.use('/api', categoryRoutes)
app.use('/api', productRoutes)

// PORT
const port = 3000;

app.listen(port, () => {
    console.log(`app is running at ${port}`)
})
