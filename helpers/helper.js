const fs = require('fs')
const jwt = require('jsonwebtoken');
const getNewId = (array) => {
    if (array.length > 0) {
        return array[array.length - 1].id + 1
    } else {
        return 1
    }
}

const newDate = () => new Date().toString()
// check for valid id
function mustBeInArray(array, id) {
  console.log(id);
    return new Promise((resolve, reject) => {
        const row = array.find(r => r.userId == id)
        if (!row) {
            reject({
                message: 'ID is not good',
                status: 404
            })
        }
        resolve(row)
    })
}
// write data to json file
function writeJSONFile(filename, content) {
    fs.writeFileSync(filename, JSON.stringify(content), 'utf8', (err) => {
        if (err) {
            console.log(err)
        }
    })
}
// generate jwt token
async function signToken(info) {
  return await jwt.sign(info, 'test123', {
    expiresIn: '7d'
  });
}
// check for valid dev
async function approveDev(array,id){
  return new Promise((resolve, reject) => {
      const row = array.find(r => r.id == id)
      if (!row) {
          reject({
              message: 'ID is not good',
              status: 404
          })
      }
      resolve(row)
  })
}
module.exports = {
    getNewId,
    newDate,
    mustBeInArray,
    writeJSONFile,
    signToken,
    approveDev
}
