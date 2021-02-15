const router = require("express").Router();
const bcrypt = require('bcrypt');
const UserModel = require('../models/User.model');
const EventModel = require('../models/Event.model');


/* GET signin page */
router.get("/signin", (req, res, next) => {
  // Shows the sign in form to the user
  res.render('auth/signin.hbs')
});

/* GET signup page */
router.get("/signup", (req, res, next) => {
  // Shows the sign up form to the user
  res.render('auth/signup.hbs')
});

// Handle POST requests to /signup
// when the user submits the data in the sign up form, it will come here
router.post("/signup", (req, res, next) => {
  // we use req.body to grab data from the input form
   const {fullName, email, password, username, address, birthday} = req.body
  console.log(req.body) // check if this is an empty object
  // if not use the length 


  //validate first
  // checking if the user has entered all three fields
  // we're missing one important step here
  if (!fullName.length || !email.length || !password.length || !username.length || !address.length || !birthday.length) {
      res.render('auth/signup', {msg: 'Please enter all fields'})
      return;
  }

  // // validate if the user has entered email in the right format ( @ , .)
  //  // regex that validates an email in javascript
  //  let re = /\S+@\S+\.\S+/;
  //  if (!re.test(email)) {
  //     res.render('auth/signup', {msg: 'Email not in valid format'})
  //     return;
  //  }

   //validate password (special character, some numbers, min 6 length)
   /*
   let regexPass = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$%&? "])[a-zA-Z0-9!#$%&?]{8,20}$/;
   if (!regexPass.test(password)) {
      res.render('auth/signup', {msg: 'Password needs to have special chanracters, some numbers and be 6 characters aatleast'})
      return;
   }

   */

   // NOTE: We have used the Sync methods here. 
   // creating a salt 
   let salt = bcrypt.genSaltSync(10);
   let hash = bcrypt.hashSync(password, salt);
   UserModel.create({fullName, email, password: hash, address, username, birthday})
      .then(() => {
          res.redirect('/')
      })
      .catch((err) => {
          next(err)
      })
});


// handle post requests when the user submits something in the sign in form
router.post("/signin", (req, res, next) => {
  const {email, password} = req.body

  // implement the same set of validations as you did in signup as well
  // NOTE: We have used the Async method here. Its just to show how it works
  UserModel.findOne({email: email})
      .then((result) => {
          // if user exists
          if (result) {
              //check if the entered password matches with that in the DB
              bcrypt.compare(password, result.password)
                  .then((isMatching) => {
                      if (isMatching) {
                          // when the user successfully signs up
                          req.session.loggedInUser = result
                          res.redirect('/profile')
                      }
                      else {
                          // when passwords don't match
                          res.render('auth/signin.hbs', {msg: 'Passwords dont match'})
                      }
                  })
          }
          else {
              // when the user signs in with an email that does not exits
              res.render('auth/signin.hbs', {msg: 'Email does not exist'})
          }
      })
      .catch((err) => {
          next(err)
      })
 
});


// GET request to handle /profile

//Middleware to protect routes
const checkLoggedInUser = (req, res, next) => {
  if (req.session.loggedInUser) {
      next()
  }
  else {
      res.redirect('/signin')
  }
}

router.get('/profile', checkLoggedInUser,  (req, res, next) => {
  let email = req.session.loggedInUser.email
  res.render('profile.hbs', {email})
})


//router.get Log Out


router.get('/logout', (req, res) => {
  req.session.destroy()
  res.redirect('/')
})

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
    category: category
  }

  EventModel.create(myNewEvent)
          .then(()=>{
            console.log(myNewEvent)
              res.redirect('/event/listing')
                
          })
          .catch((err)=>{
              console.log(err, 'something went wrong creating the Event')
          })

      console.log(req.body)
})

// Route for events
router.get('/event/listing', (req, res, next) => {
  res.render('event/events-list.hbs')
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

// Edit event

// POST route to update 
router.post("/event/:id/edit", (req, res, next) => {
  //Update/edit the event
  const { id } = req.params 

  // findByIdAndUpdate will use the information passed from the request body to update the drone
  EventModel.findByIdAndUpdate(id, { $set: req.body })
    .then((event) => {
      console.log(`Event ${event.name} updated`);
      res.redirect("/event/events-list.hbs");
    })
    .catch((err) => console.log(err));
});


// Delete event



module.exports = router;