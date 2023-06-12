const chai = require('chai');
const chaiHttp = require('chai-http');

global.expect = chai.expect;
chai.use(chaiHttp);
