const dateTime = require("../utils/date-time")
const reservationsService = require("./reservations.service");
const moment = require("moment")

//Error handlers
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");


// Templates to validate data
const VALID_PROPERTIES = [
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people",
];

//Middleware
function hasOnlyValidProperties(req, res, next) {
  const { data = {} } = req.body;

  const invalidFields = Object.keys(data).filter(
    (field) => !VALID_PROPERTIES.includes(field)
  );

  if (invalidFields.length)
    return next({
      status: 400,
      message: `Invalid field(s): ${invalidFields.join(", ")}`,
    });
  next();
}

function validateProperties(req, res, next){
  const data  = req.body;
  //console.log(data, "this is the data from the request");
  //console.log(moment(), "this is current time");

  //*Initialize the variables to make the validations
  const currentDay = dateTime.today;
  const currentTime = moment().format("HH:mm");
  const givenDate = new Date(data.reservation_date + " " + data.reservation_time);
  const day = givenDate.getDay();

  //*Date objects for the closing time and the opening time
  const openingTime = new Date(data.reservation_date + " " + "10:30");
  const closingTime = new Date(data.reservation_date + " " + "21:30");

  //*Validations
  if (day === 2){
    next({
      status: 400,
      message: "!! CANNOT MAKE RSVPS ON TUESDAYS !!"
    })
  } 
  if (currentDay === data.reservation_date) {
    if(currentTime > data.reservation_time){
      next({
        status: 400,
        message: "!! RSVP TIME CANNOT BE BEFORE THE CURRENT TIME !!"
      })
    }
  }
  if (currentDay > data.reservation_date){
    next({
      status: 400,
      message: "!! CANNOT MAKE AN RSVP IN THE PAST !!"
    })
  }
  if(closingTime.getHours() === givenDate.getHours()){
    if(closingTime.getMinutes() < givenDate.getMinutes()){
      next({
        status: 400,
        message: "!! CANNOT MAKE THE RESERVATION LESS THAN 1HR BEFORE WE CLOSE !!"
      })
    }
  }
  if(openingTime.getHours() === givenDate.getHours() ){
    if( openingTime.getMinutes() > givenDate.getMinutes()){
      next({
        status: 400,
        message: "!! CANNOT MAKE THE RESERVATION BEFORE WE OPEN !!"
      })
    }
  }
  if (openingTime.getHours() > givenDate.getHours()){
    next({
      status: 400,
      message: "!! CANNOT MAKE THE RESERVATION BEFORE WE OPEN !!"
    })
  }
  if (closingTime.getHours() < givenDate.getHours()){
    next({
      status: 400,
      message: "!! CANNOT MAKE THE RESERVATION AFTER WE CLOSE!!"
    })
  }
  if (data.people < 1){
    next({
      status: 400,
      message: "!! CANNOT MAKE A RESERVATION WITHOUT AT LEAST 1 PERSON !!"
    })
  }
  console.log("!!passed the validations!!")
  res.locals.reservation = data;
}

// CRUD Functions
async function list(req, res) {
  const data = await reservationsService.list();
  res.json({ data });
}

async function create(req, res){
  console.log(res.locals.reservation, "this is the reservation")
  //console.log(req.body, "this is the body of the request")
  //const data = await reservationsService.create(req.body);
  //console.log(data, "this is the response from the server")
  //res.status(201).json({ data });
}

module.exports = {
  list,
  create: [
    hasOnlyValidProperties,
    validateProperties,
  ],
};
