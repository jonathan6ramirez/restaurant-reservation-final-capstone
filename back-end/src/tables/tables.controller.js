const tablesService = require("./tables.service");

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
    // console.warn("---------", req.params.tableId, "----------");
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

async function seatReservation (req, res) {
    const { table: data } = res.locals
    const { data: { reservationId } } = req.body;
    console.log(reservationId, "this is the data from the put request")
    console.log("********", data, "********");
    data.reservation_id = reservationId;
    console.log("---------",data, "This is the data after the update")
    console.log(reservationId, "this is from the body of the req")
    res.json({ data })
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
}