import { Router } from 'express';
import apiRoutes from './api';

const router = Router();

router.use('/api', apiRoutes);

router.use((req, res) => {
    res.status(404).send('404 Not Found');
});

export default router;
