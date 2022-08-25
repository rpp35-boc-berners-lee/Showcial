import { Request, Response, Router } from 'express';
const router = Router();

router.get('/', (req: Request, res: Response) => {
   res.status(200).json({
      status: 'success',
      data: {
         name: 'Blue Ocean Capstone',
         version: '1.0.0',
      },
   });
});

export { router };
