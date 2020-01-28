require('dotenv').config()

const express = require('express')
const app = express()
const sequelize = require('./db')
const videogame = require('./controllers/videogamecontroller')
const user = require('./controllers/usercontroller')

app.use(require('./middleware/headers'));


sequelize.sync();
//sequelize.sync({ force: true });

app.use(express.json())

app.use(express.static(__dirname + '/public'))
console.log(__dirname)

app.get('/', (req, res) => res.render('index'))

app.use('/videogames', videogame)
app.use('/user', user)

app.listen(process.env.PORT, () => console.log(`App is listening on ${process.env.PORT}`))
