import {
  BadRequestError,
  EOrderStatus,
  NotFoundError,
  requireAuth,
  validateRequest,
} from '@webmakaka/microservices-common';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { Order } from 'models/Order';
import { Ticket } from 'models/Ticket';
import mongoose from 'mongoose';

const router = express.Router();

const EXPIRATION_WINDOW_SECONDS = 15 * 60;

router.post(
  '/api/orders',
  requireAuth,
  [
    body('ticketId')
      .not()
      .isEmpty()
      .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
      .withMessage('TicketId must be provided'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { ticketId } = req.body;

    const ticket = await Ticket.findById(ticketId);

    if (!ticket) {
      throw new NotFoundError();
    }

    const isReserved = await ticket.isReserved();

    if (isReserved) {
      throw new BadRequestError('[Orders] Ticket is already reserved');
    }

    const expiration = new Date();
    expiration.setSeconds(expiration.getSeconds() + EXPIRATION_WINDOW_SECONDS);

    const order = Order.build({
      userId: req.currentUser!.id,
      status: EOrderStatus.Created,
      expiresAt: expiration,
      ticket,
    });

    await order.save();

    return res.status(201).send(order);
  }
);

export { router as newOrderRouter };
