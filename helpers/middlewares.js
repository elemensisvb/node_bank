function mustBeInteger(req, res, next) {
    const id = req.params.id

    if (!Number.isInteger(parseInt(id))) {
        res.status(400).json({ message: 'ID must be an integer' })
    } else {
        next()
    }
}

function checkFieldsBank(req, res, next) {
    const { senderAccountNo,receiverAccountNo, amount } = req.body

    if (senderAccountNo && receiverAccountNo && amount) {
        next()
    } else {
        res.status(400).json({ message: 'fields are not good' })
    }
}

function checkFieldsRegister(req, res, next) {
    const { name, password, contactNo, city, pinNo } = req.body

    if (name && password && contactNo && city && pinNo) {
        next()
    } else {
        res.status(400).json({ message: 'All fields are required.' })
    }
}

module.exports = {
    mustBeInteger,
    checkFieldsBank,
    checkFieldsRegister
}
