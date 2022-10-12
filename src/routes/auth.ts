import express, { Request, Response, NextFunction } from 'express';

const router = express.Router();

router.post(
  '/login',
  async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.headers.authorization;
    if (accessToken)
      res.status(200).json({ isSuccess: true, data: { message: 'test' } });
    else next();
  },
);
