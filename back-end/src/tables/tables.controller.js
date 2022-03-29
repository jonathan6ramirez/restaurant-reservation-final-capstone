const tablesService = require("./tables.service");
const reservationsService = require("../reservations/reservations.service");

const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");

// TODO make a function for the put to seat a reservation
// TODO you need to check that the table exists in the database before hand

// *Templates to validate the data passed to the api
const VALID_PROPERTIES = [
    "table_name",
    "capacity",
];

// * Middleware
function hasOnlyValidProperties(req, res, next){
    const { data = {}} = req.body;

    const invalidFields = Object.keys(data).filter(
        (field) => !VALID_PROPERTIES.includes(field)
    )
    if(invalidFields.length)
    return next({
        status: 400,
        message: `Invalid field(s): ${invalidFields.join(", ")}`,
    })
    next();
}

const hasRequiredProperties = hasProperties("table_name", "capacity");

async function tableExists(req, res, next) {
    const table = await tablesService.read(req.params.tableId);
    if (table){
        res.locals.table = table
        return next();
    }
    next({ status: 404, message: "Table not found."})
}

// *CRUD functions
async function create(req, res){
    const table = req.body.data;
    const data = await tablesService.create(table);
    res.status(201).json({ data });
}

async function list(req, res){
    const data = await tablesService.list();
    res.json({ data })
}

async function read (req, res) {
    const { table: data } = res.locals;
    res.json({data});
}

async function seatReservation (req, res, next) {
    try{
        const { table: data } = res.locals
        const { data: { reservationId } } = req.body;
        const reservation = await reservationsService.read(reservationId);
        if(!reservation){
            return next({status: 400, message: "Reservaiton does not exist"})
        }
        if(reservation.people > data.capacity){
            return next({status: 400, message: "Table does not seat enough for the reservation"});
        }
        if (data.reservation_id){
            console.log("there is a reservation associated with the table")
            return next({ status: 400, message: "Table is already occupied"});
        }
        data.reservation_id = reservationId;
        const updatedTable = await tablesService.update(data);
        res.status(200).send({ updatedTable })
    } catch (err){
        console.log("!!!!", err, "!!!!")
        return next({ status: 500, message: err});
    }
}

async function removeReservation (req, res, next) {
    try {
        const { table: data } = res.locals;
        data.reservation_id = null;
        const updateTable = await tablesService.update(data);
        res.status(200).send({ updateTable })
    } catch (err) {
        console.log("!!!!", err, "!!!!")
        return next({ status: 500, message: err});
    }
}

module.exports = {
    list,
    create: [
        hasOnlyValidProperties,
        hasRequiredProperties,
        asyncErrorBoundary(create)
    ],
    read: [
        asyncErrorBoundary(tableExists),
        asyncErrorBoundary(read),
    ],
    seat: [
        asyncErrorBoundary(tableExists),
        asyncErrorBoundary(seatReservation)
    ],
    delete: [
        asyncErrorBoundary(tableExists),
        asyncErrorBoundary(removeReservation)
    ]
}