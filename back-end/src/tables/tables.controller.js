const tablesService = require("./tables.service");

const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");

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

// *CRUD functions
async function create(req, res){
    const table = req.body.data;
    const data = await tablesService.create(table);
    res.status(201).json({ data });
}

async function list(req, res){
    const data = await tablesService.list();
    console.log(data, "this is the data returned from the knex call to the database inside the tables controller")
    res.json({ data })
}

module.exports = {
    list,
    create: [
        hasOnlyValidProperties,
        hasRequiredProperties,
        asyncErrorBoundary(create)
    ]
}