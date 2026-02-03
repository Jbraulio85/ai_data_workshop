import { Router } from 'express';
import { handleNaturalQuery } from './ai.controller.js';
import { validateJWT } from '../../middlewares/validate-jwt.js';

const router = Router();

router.post('/query', validateJWT, handleNaturalQuery);

export default router;
