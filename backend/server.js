const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
let corsOptions = {
    origin: "http://localhost:8081"
};
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
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
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
})