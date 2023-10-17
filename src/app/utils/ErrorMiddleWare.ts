import { NextApiResponse } from 'next';
import AppError from './Error.ts';

const errorMiddleware = (err: Error, res: NextApiResponse,statusCode:number) => {
  if (err instanceof AppError) {
    return res.status(statusCode).json({ error: err.message });
  } else {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default errorMiddleware;