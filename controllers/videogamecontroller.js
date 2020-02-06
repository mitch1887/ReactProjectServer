const router = require('express').Router();
const VideoGame = require('../db').import('../models/videogame')
const validateSession = require('../middleware/validate-session');


router.get('/', (req, res) => {
    VideoGame.findAll()
        .then(game => res.status(200).json(game))
        .catch(err => res.status(500).json({ error: err }))
})

// Create Video Game
router.post('/', validateSession, (req, res) => {
    const gameFromRequest = {
        name: req.body.name,
        description: req.body.description,
        rating: req.body.rating,
        owner: req.user.email
    }

    VideoGame.create(gameFromRequest)
        .then(game => res.status(200).json(game))
        .catch(err => res.json(req.errors))
})

// Get Video Game by Name
router.get('/name/:name', (req, res) => {
    console.log("Name Endpoint")

    VideoGame.findOne({ where: { name: req.params.name } })
        .then(game => res.status(200).json(game))
        .catch(err => res.status(500).json({ error: err }))
});

// Get Video Game by ID
router.get('/id/:id', (req, res) => {
    console.log("ID Endpoint")

    VideoGame.findOne({ where: { id: req.params.id } })
        .then(game => res.status(200).json(game))
        .catch(err => res.status(500).json({ error: err }))
});

// Update Video Game by Name
router.put('/name/:name', validateSession, (req, res) => {
    VideoGame.update(req.body, { where: { name: req.body.name, owner: req.user.email } })
        .then(game => res.status(200).json(game))
        .catch(err => res.json({ error: err }))
});

// Delete Video Game by ID
router.delete('/:id', validateSession, (req, res) => {
    VideoGame.destroy({ where: { id: req.params.id, owner: req.user.email } })
        .then(game => res.status(200).json(game))
        .catch(err => res.json({ error: err }))
});

// Delete Video Game by Name
router.delete('/name/:name', validateSession, (req, res) => {
    VideoGame.destroy({ where: { name: req.params.name, owner: req.user.email } })
        .then(game => res.status(200).json(game))
        .catch(err => res.json({ error: err }))
});


module.exports = router