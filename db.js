const Sequelize = require('sequelize')

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres'
}
)

sequelize.authenticate() 
  .then(() => console.log('postgres db is connected'))
  .catch(err => console.log(err))

User = sequelize.import('./models/user');
VideoGame = sequelize.import('./models/videogame');


module.exports = sequelize;
