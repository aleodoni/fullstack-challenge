import express from 'express';
import { Request, Response } from 'express';

const router = express.Router();

router.get('/api/status',
  async (req: Request, res: Response) => {
    return res.status(200).json({status: true})
  }
);

export { router as indexRouter };
