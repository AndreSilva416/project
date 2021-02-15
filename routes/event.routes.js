const router = require("express").Router();
const EventModel = require('../models/Event.model');

// CREATE EVENT
// GET create event route

router.get('/event/create', (req, res, next) => {
  res.render('event/create-form.hbs')
});

// POST create event
router.post('/event/create', (req, res, next) => {
  const {title, date, location, description, ageRestriction, category} = req.body
  let myNewEvent = {
    title,
    date,
    location,
    description,
    ageRestriction,
    category: category,
    creator: req.session.loggedInUser._id
  }

  EventModel.create(myNewEvent)
          .then(()=>{
            // console.log(myNewEvent)
              res.redirect('/event/listing')
                
          })
          .catch((err)=>{
              console.log(err, 'something went wrong creating the Event')
          })

      console.log(req.body)
})

// Route for events
router.get('/event/listing', (req, res, next) => {
  console.log(req.query)
  let searchQuery = {};
  if (req.query.category){
    searchQuery.category = req.query.category;
  }
  if (req.query.date){
    searchQuery.date = req.query.date;
  }
  console.log(searchQuery);
  
  EventModel.find(searchQuery)
        .then((events) => {
          events = events.map(function(singleEvent){
            singleEvent.showButtons = req.session.loggedInUser._id == singleEvent.creator
            return singleEvent;
          })
        res.render('event/events-list.hbs', {events})
        })
        .catch((err) => {
            console.log(err, 'Something went wrong while finding')
        })
});

// GET event by id
router.get('/event/:id/edit', (req, res, next) => {
  // grab the events id from the url
  let id = req.params.id
 
  EventModel.findById(id)
      .then((events) => {
          res.render('event/update-form.hbs', {events})
      })
      .catch(() => {
          console.log('Something went wrong while getting an event')
      })

})

// // Edit event
// Delete event

router.get('/event/:id/delete', (req, res, next) => {
  //handle delete requests 
  let id = req.params.id

  EventModel.findByIdAndDelete(id)
      .then(() => {
          res.redirect('/event/listing')
      })
      .catch(() => {
          console.log('Delete failed!')
      })
})



module.exports = router;