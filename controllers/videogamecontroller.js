const router = require('express').Router();
const VideoGame = require('../db').import('../models/videogame')
const validateSession = require('../middleware/validate-session');


router.get('/', (req, res) => {
    VideoGame.findAll()
        .then(game => res.status(200).json(game))
        .catch(err => res.status(500).json({ error: err }))
})

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

router.get('/:name', (req, res) => {
    VideoGame.findOne({ where: { name: req.params.name } })
        .then(game => res.status(200).json(game))
        .catch(err => res.status(500).json({ error: err }))
});

// Get Video Game by ID
router.post('/:id', (req, res) => {
    const id = req.body.id;
    console.log("Test")

    VideoGame.findOne({ where: { id: id } })
        .then(game => res.status(200).json(game))
        .catch(err => res.status(500).json({ error: err }))
});

router.put('/:id', (req, validateSession, res) => {
    VideoGame.update(req.body, { where: { id: req.params.id } })
        .then(game => res.status(200).json(game))
        .catch(err => res.json({ error: err }))
});
router.delete('/:id', (req, validateSession, res) => {
    VideoGame.destroy({ where: { id: req.params.id } })
        .then(game => res.status(200).json(game))
        .catch(err => res.json({ error: err }))
});


module.exports = router