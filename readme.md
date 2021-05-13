# Events
<br>

## Description
Search or post an event in your area.
<br>

## User stories
- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault.
- **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault
- **login-signup** - As a user I want to see a welcome page that gives me the option to either log in as an existing user, or sign up with a new account. 
- **add-signup** - As a user I want to sign up with my full information so that I can post or join events.
- **homepage** - As a user want to search for an event using fiters, post my event and go to my profile from the home page.
- **event-search-results** - As a user I want to see the search results with a overview image, title, description, where and when. Also, to go back to the homepage if I don't want to see that search anymore.
- **post-event-form** - As a user I want to post my event, fill in the title, description, location, date, age-restriction(optional) and upload an event photo. Also, to go back to homepage if I don't want to see that item anymore.
- **success-post-event** - As a user I want to see a success page that shows my event in details. Also, to go back to the home page when I'm done.
- **success-join-event** - As a user I want to see a success page that is confirming, I've joined the event succesfully. Also, to go back to the home page when I'm done.
- **user-profile** - As a user I want to check the events i am attending or that i have created.My profile information and be able to edit it. Also, to go back to the home page if I don't want to see the profile anymore.
- **notifications** - As a user I want to check my notifications who joined my event.
<br>

## API routes (back-end)

- GET / 
  - renders login-signup.hbs
- GET /auth/signup
  - redirects to / if user logged in
  - renders add-signup.hbs
- POST /auth/signup
  - redirects to / if user logged in
  - body:
    - email
    - password
    - full name
    - birthday
    - address
 
- POST /auth/login
  - redirects to / if user logged in
  - body:
    - email
    - password
- POST /auth/logout
  - body: (empty)

- GET /
  - renders homepage.hbs (create event + search event)
- POST /homepage (search action)
  - body: 
    - category
    - date
    - location
- GET /event-search-results
  - renders event-search-results.hbs
  - includes the list of events
  - redirects to / if user presses button
- GET /event/:id
  - renders event.hbs
  - redirects to /event-search-results if user presses button
- POST /event/:id/join
- GET /post-event
  - renders post-event-form.hbs
  - redirects to /event-search-results if user presses button
- POST /create-event-form
  - body: 
     - title
     - description
     - category
     - location
     - date
     - event-photo
     - age restriction(optional)
- GET /edit-event/:id
    - renders edit-event-form.hbs
- POST /edit-event/:id   
- GET /success
  - renders success.hbs
  - redirects to / if user presses button
  
- GET /profile
  - renders user-profile.hbs
  - redirects to / if user presses button
- POST /profile (to edit profile)
  - redirects to /add-signup (we reuse it but for edit purposes)
  - body:
    - email
    - password
    - full name
    - birthday
    - address
 
- POST / event/:id/delete

- GET /notifications
  - renders notifications.hbs
  - redirects to / if user presses button
- GET /success/join/:id (for joining event)
  - renders success.hbs
  - redirects to /profile if user presses button
- GET /success/post/:id (for posting event)
  - renders success.hbs
  - redirects to /profile if user presses button

<br>

## Models
 
 - User 
    new Schema ({
     	_id: ,
     	email: String, required: true, unique: true
        password: String, minlength: 6, maxlength: 12, required: true
     	fullName: String, required: true, maxlength: 20,
        birthday: Date, 
        address: String, required: true, maxlength: 30,
		})
          
  - Event 
    new Schema ({
			_id: ,
        creator:mongoose.id.UserSchema
      title: String, required: true
      category: String, required: true
      description: String, required: true
      location: String, required: true, 
      date: Date, required: true,
      photo: String,
      age-restriction: Number,
      attendants: [mongoose.id.UserSchema]
    })
       <br>
    
## Backlog

 
<br>

## Links


### Deploy Link
https://eventlis-reloaded.herokuapp.com/

### Git

https://github.com/AndreSilva416/project
