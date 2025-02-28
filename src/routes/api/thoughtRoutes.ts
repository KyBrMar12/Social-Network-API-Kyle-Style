import { Router } from 'express';
import { thoughtController } from '../../controllers/thoughtController';

const router = Router();

router.route('/')
    .get(thoughtController.getThoughts)
    .post(thoughtController.createThought);

router.route('/:thoughtId')
    .get(thoughtController.getThoughtById)
    .put(thoughtController.updateThought)
    .delete(thoughtController.deleteThought);

router.route('/:thoughtId/reactions')
    .post(thoughtController.addReaction);

router.route('/:thoughtId/reactions/:reactionId')
    .delete(thoughtController.removeReaction);

export default router;
