process.env.NODE_ENV = 'test';
//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);
/*
  * Test the /GET route
  */
describe('/GET LoanCategory', () => {
    it('it should GET all the LoanCategory', (done) => {
        chai.request(server)
            .get('/loancategory')
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
});
