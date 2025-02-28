import { Router } from 'express';
import { userController } from '../../controllers/userController';

const router = Router();

router.route('/').get(userController.getUsers).post(userController.createUser);
router.route('/:userId').get(userController.getUserById).put(userController.updateUser).delete(userController.deleteUser);
// Route to add a friend
router.post('/:userId/friends/:friendId', userController.addFriend);

// Route to remove a friend
router.delete('/:userId/friends/:friendId', userController.removeFriend);

export default router;
