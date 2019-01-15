// Third party imports
const router = require('express').Router()
const lodash = require('lodash')
const sequelize = require('sequelize')
// Local imports
const config = require('../utils/config.json')
const {
  getHttpRequestPromise
} = require('../utils/services')

const path = require('path');
const fs = require('fs');
const multer = require('multer');
const DIR = './uploads';

// models
const Loan = require('../models').loan
const Note = require('../models').note
const Op = sequelize.Op

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + '.' + path.extname(file.originalname));
  }
});
let upload = multer({storage: storage});

/**
 * Health check endpoint: Used to run a health check on ther server endpoints
 */
router.get('/_health', (req, res) => {
  res.status(200).send({ message: 'ok' })
})

// GET loan by dueDate or bankName OR get all loans if no query param
// GET /loans get all loans
// GET /loans?bankName=Banco returns loans where bank name contains the string provided in query
// GET /loans?dueDate=2019-02-25 returns loans by due date
router.get('/loans', async (req, res) => {
  const requestQuery = req.query
  let loans

  if (requestQuery.dueDate){
    const dateParam = requestQuery.dueDate
    loans = await Loan.findAll({
      where: { dueDate: {
        [Op.eq]:  new Date(dateParam)
      } }
    })
  } else if (requestQuery.bankName){
    const bankNameParam = requestQuery.bankName
    loans = await Loan.findAll({
      where: { bankName: {
        [Op.iLike]:  `%${bankNameParam}%`
      } }
    })
  } else {
    loans = await Loan.findAll({order: [['createdAt', 'DESC']]})
  }

  res.status(200).send({ loans })
})

// GET loan by ID
// GET /loan/1 returns a loan and its notes
router.get('/loan/:id', async (req, res) => {
  const loanId = parseInt(req.params.id, 10)
  const loan = await Loan.findById(loanId, {
    include: [
      { model: Note, as: 'notes' }
    ]
  })
  res.status(200).send({ loan })
})

// POST loan
// /loan with body of loan data. eg.:{ "bankName": "test2", "loanNumber": 1235, "amount": 5000, "balance": 1000, "partialPayments": 4000, "openingDate": "2018-10-02T00:00:00.000Z", "dueDate": "2018-10-20T00:00:00.000Z", "project": "test project 11", "details": "details of test loan 11" }
router.post('/loan', async (req, res) => {
  const requestBody = req.body
  const response = await Loan.create(requestBody)
  res.status(200).send({ response: response })
})

// Add notes to a loan
// /loan/2/note with body of note. eg.:{ "title": "test loan note - 5", "note": "test note 2 for loan 1" }
router.post('/loan/:loanId/note', async (req, res) => {
  const loanId = parseInt(req.params.loanId, 10)
  const loan = await Loan.findById(loanId)
  const note = req.body
  const loanNote = await loan.createNote(note)
  res.status(200).send({ responseData: "test data", loanNote })
})


// Edit a loan
// /loan/2 with body of loan to change
router.put('/loan/:id', async (req, res) => {
  const loanId = parseInt(req.params.id, 10)
  const requestBody = req.body

  const loan = await Loan.findById(loanId)
  if (loan == null) {
    res.status(404).send({ Error: "Loan with provided ID does not exist" })
  }
  const response = await loan.update(requestBody)
  res.status(200).send({ response })
})

// Delete a loan
// /loan/2 deletes the loan with the provided ID and returns an empty body
router.delete('/loan/:id', async (req, res) => {
  const loanId = parseInt(req.params.id, 10)

  const loan = await Loan.findById(loanId)
  const response = await loan.destroy()
  res.status(200).send({ response: response })
})

// upload file
router.get('/api', function (req, res) {
  res.end('file catcher example');
});
 
router.post('/api/upload',upload.single('photo'), function (req, res) {
  if (!req.file) {
    console.log("No file received");
    return res.send({
      success: false
    });
  } else {
    console.log('file received');
    return res.send({
      success: true
    })
  }
});

module.exports = router
