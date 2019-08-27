Install packages with `yarn install`.  
To run
`nodemon index.js`

1. create new dev using register api having body
req: {
	"name":"test1",
	"password":1234,
	"contactNo":62764392,
	"city":"Melbourne",
	"pinNo":3145
}
res: {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MzAzZTkwLWM4YmUtMTFlOS1iMThlLWRiMTIyOGRkODUzYiIsImlhdCI6MTU2NjkwNTU2OSwiZXhwIjoxNTY3NTEwMzY5fQ.e4P0hM2VvdC3Tz5GspyBr2rwcqihbGJKXO41wi5DKcY"
}
2. use token that you received in register api to access all rest apis.
