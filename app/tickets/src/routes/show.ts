import { NotFoundError } from '@webmak/microservices-common';
import express, { Request, Response } from 'express';
import { Ticket } from 'models/Ticket';

const router = express.Router();

router.get('/api/tickets/:id', async (req: Request, res: Response) => {
  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    throw new NotFoundError();
  }

  return res.status(200).send(ticket);
});

export { router as showTicketRouter };
