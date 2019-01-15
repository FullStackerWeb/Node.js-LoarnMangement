// Third party imports
const chai = require('chai')
const chaiHttp = require('chai-http')

// Local imports
const server = require('../app')
chai.use(chaiHttp)
const { expect } = chai

describe('==== Unit Tests ====', function () {
  describe('==== API endpoints test ====', function () {
    it('GET all product shared between the provided exchanges: BNB,BTX and BFX', (done) => {
      chai.request(server)
      .get(`/products`)
      .end(function (err, res) {
        if (err) {
          console.log(err)
        }
        expect(200)
        const resultBody = res.body
        expect(resultBody.products).to.an('array')
        expect(resultBody.products[0]).to.have.property('id')
        expect(resultBody.products[0]).to.have.property('originalId')
        expect(resultBody.products[0]).to.have.property('quote_currency')
        expect(resultBody.products[0]).to.have.property('base_min_size')
        expect(resultBody.products[0]).to.have.property('base_max_size')
        expect(resultBody.products[0]).to.have.property('quote_decimal_precision')
        done()
      })
    })

    it('should GET prices for product on all exchanges', (done) => {
      const product = 'BTC-BAT'
      chai.request(server)
      .get(`/products/${product}/prices`)
      .end(function (err, res) {
        if (err) {
          console.log(err)
        }
        expect(200)
        const resultBody = res.body
        expect(resultBody.response).to.an('array')
        expect(resultBody.response.length).to.eql(3)
        expect(resultBody.response[0]).to.have.property('exchange')
        expect(resultBody.response[0]).to.have.property('price')
        done()
      })
    })

    it('should return a 404 for routes that don\'t exist', (done) => {
      chai.request(server)
      .get(`/test`)
      .end(function (err, res) {
        if (err) {
          console.log(err)
        }
        expect(404)
        done()
      })
    })

    it('should test the health check route', (done) => {
      chai.request(server)
      .get(`/_health`)
      .end(function (err, res) {
        if (err) {
          console.log(err)
        }
        expect(200)
        expect(res.body).to.be.an('object')
        expect(res.body.message).to.equal('ok')
        done()
      })
    })
  })
})
