import  express  from "express";
import UserController from "../controller/user1.js"
const router = express.Router()

router.get('/',UserController.getAllUsers)
router.post('/',UserController.createUser)
router.get('/:d',UserController.getuserById)
router.put('/:id',UserController.editUserById)
router.delete('/:id',UserController.deleteUserById)

export default router