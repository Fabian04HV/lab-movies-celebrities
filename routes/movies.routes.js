const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");

const router = require("express").Router();


router.get('/movies', (req, res, next) =>{
  Movie.find()
    .then(movies => {
      res.render('movies/movies', { movies })
    })
})

router.get('/movies/:id', (req, res, next) => {
  Movie.findById(req.params.id)
    .populate('cast')
    .then(movie => {
      res.render('movies/movie-details', {movie})
    })
    .catch(err => console.log(err))
})

// all your routes here
router.get('/movie/create', (req, res, next) => {
  console.log('SEND ME TO NEW MOVIE HBS FILE')
  const celebrities = Celebrity.find().then(celebs => {
    res.render('movies/new-movie', { celebs })
  }).catch(err => console.log(err))
})

router.post('/movie/create', (req, res, next) => {
  Movie.create({
    title: req.body.title,
    genre: req.body.genre,
    plot: req.body.plot,
    cast: req.body.cast
  })
  .then(createdMovie => {
    res.redirect('/movies')
  })
})

router.post('/movies/:id/delete', (req, res, next) => {
  Movie.findByIdAndRemove(req.params.id)
    .then(()=>{
      res.redirect('/movies')
    })
    .catch(err => next(err))
})
router.get('/movies/:id/edit', (req, res, next) => {
  Movie.findById(req.params.id)
  .then(movie => {
    res.render('movies/edit-movie', {movie})
  })
})

router.post('/movies/:id/edit', (req, res, next) => {
  Movie.findById(req.params.id)
    .then(movie => {
      res.render('/movies/edit-movie', {movie})
    })
    .catch(err => next(err))
})

router.post('/movies/:id', (req, res, next) => {
  const {title, genre, plot} = req.body
  Movie.findByIdAndUpdate(req.params.id, {title, genre, plot})
    .then(() => {
      res.redirect(`${req.params.id}`)
    })
    .catch(err => next(err))
})
module.exports = router;
