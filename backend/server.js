const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const LoanCategoryRouter = require('./routes/loancategory.routes');
const LoanRouter = require('./routes/loan.routes');

const app = express();
let corsOptions = {
    origin: "http://localhost:8081"
};
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./models");
const Role = db.role;
db.sequelize.sync({force: true}).then(() => {
    console.log('DB initialization and sync');
    initial();
});

function initial() {
    Role.create({
        id: 1,
        name: "customer"
    });
    Role.create({
        id: 3,
        name: "admin"
    });
}


// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to Accounts Backend" });
});

require('./routes/auth.routes')(app);
app.use('/loancategory', LoanCategoryRouter);
app.use('/loan', LoanRouter);
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
})