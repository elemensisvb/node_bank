let banks = require('./data/banks.json')
const filename = './data/banks.json'
const helper = require('./helpers/helper.js')

function getBanks() {
    return new Promise((resolve, reject) => {
        if (banks.length === 0) {
            reject({
                message: 'no posts available',
                status: 202
            })
        }

        resolve(banks)
    })
}
function getBank(id) {
  // console.log(id);
    return new Promise((resolve, reject) => {
        const row = banks.find(r => r.accountNo == id)
        if (!row) {
            reject({
                message: 'ID is not good',
                status: 404
            })
        }
        resolve(row)
    })
}
function getBankUserByToken(id) {
    return new Promise((resolve, reject) => {
        helper.mustBeInArray(banks, id)
        .then(bank => resolve(bank))
        .catch(err => reject(err))
    })
}



function updateBank(body) {
    return new Promise(async(resolve, reject) => {

        let senderBank = await getBank(body.senderAccountNo)
        const row = banks.find(r => r.accountNo == body.receiverAccountNo)

        if (!row) {
            reject({
                message: 'ID is not good',
                status: 404
            })
        }
        //
        const receiverIndex = banks.findIndex(p => p.accountNo == row.accountNo)
        const senderIndex = banks.findIndex(s => s.accountNo == senderBank.accountNo)

        const senderRestBal = (senderBank.amount - body.amount);
        if(senderRestBal <= 0){
          resolve(0)
        } else {
          const recieverBal = row.amount + body.amount;
          banks[receiverIndex] = {
                                    "userId": row.userId,
                                    "accountNo": row.accountNo,
                                    "amount": recieverBal
                                }
          banks[senderIndex] = {
                                    "userId": senderBank.userId,
                                    "accountNo": senderBank.accountNo,
                                    "amount": senderRestBal
                                }
          helper.writeJSONFile(filename, banks)
          resolve('Balance updated')
        }
    })
}



module.exports = {
    getBanks,
    getBank,
    getBankUserByToken,
    updateBank,
}
