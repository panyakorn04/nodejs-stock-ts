const express = require('express');
const router = express.Router();

//controllers
const { register, login, listUser, editUser, deleteUser } = require('../controllers/auth');
// middleware
const { auth } = require('../middleware/auth');

//@Enpoint: http://localhost:3000/api/register
//@Method: POST
//@Assess: Register user
router.post("/register", register);

//@Enpoint: http://localhost:3000/api/login
//@Method: GET
//@Assess: Authenticate user
router.post("/login",login)

//@Enpoint: http://localhost:3000/api/login
//@Method: GET
//@Assess: Authenticate user
router.get("/1", auth, (req ,res ) => {
    res.send("Hello API World post listUser!");
});


//@Enpoint: http://localhost:3000/api/auth
//@Method: GET
//@Assess: Authenticate user
router.get("/auth",listUser )


//@Enpoint: http://localhost:3000/api/auth
//@Method: PUT
//@Assess: Authenticate user
router.put("/",editUser )

//@Enpoint: http://localhost:3000/api/auth
//@Method: DELETE
//@Assess: Authenticate user
router.delete("/", deleteUser)

module.exports = router;