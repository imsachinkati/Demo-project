import express from 'express';
const router = express.Router();
import ManageUserController from '../../controllers/user/ManageUser';

// Add routes for each controller method
router.post('/addUser', ManageUserController.addUser)
router.put('/updateUser', ManageUserController.updateUser);
router.delete('/deleteUser/:userId', ManageUserController.deleteUser);
router.get('/listUsers', ManageUserController.listUsers);
// Add other methods here...

export default router;