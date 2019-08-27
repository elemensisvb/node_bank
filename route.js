const express = require('express')
const router = express.Router()
const bank = require('./bank.js')
const m = require('./helpers/middlewares')



/* All Bank acc */
router.get('/', async (req, res) => {
    await bank.getBanks()
    .then(banks => res.json(banks))
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        } else {
            res.status(500).json({ message: err.message })
        }
    })
})

/* A Bank by id */
router.get('/:id', m.mustBeInteger, async (req, res) => {
    const id = req.params.id
    console.log('get account by id ',id);
    await bank.getBank(id)
    .then(bank => res.json(bank))
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        } else {
            res.status(500).json({ message: err.message })
        }
    })
})


/* Update a bank */
router.put('/', m.checkFieldsBank, async (req, res) => {
    console.log('update account.........');
    // const id = req.params.id

    await bank.updateBank(req.body)
    .then(bank => {
      console.log('response: ',bank);
      if(bank){
        res.json({
          message: `The bank balance has been updated`,
          // content: bank
        })
      } else {
        res.json({
          message: `Sorry! insufficient balance in your account.`,
          // content: bank
        })
      }

    })
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        }
        // res.status(500).json({ message: err.message })
    })
})



module.exports = router
