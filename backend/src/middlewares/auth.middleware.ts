import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  jwt.verify(token, process.env.JWT_SECRET!, (err, decoded: any) => {
    if (err) return res.status(401).json({ message: 'Unauthorized' });
    req.userId = decoded.userId;
    next();
  });
};
