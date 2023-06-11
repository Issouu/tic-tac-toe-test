const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const chaiHttp = require('chai-http');

global.expect = chai.expect;
global.sinon = sinon;
chai.use(sinonChai);
chai.use(chaiHttp);
