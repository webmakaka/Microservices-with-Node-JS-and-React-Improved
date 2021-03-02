import { EOrderStatus } from '@webmak/microservices-common';
import { ITicketDoc } from 'models/Ticket';
import mongoose from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

interface IOrderAttrs {
  userId: string;
  status: EOrderStatus;
  expiresAt: Date;
  ticket: ITicketDoc;
}

interface IOrderDoc extends mongoose.Document {
  userId: string;
  status: EOrderStatus;
  expiresAt: Date;
  ticket: ITicketDoc;
  version: number;
}

interface IOrderModel extends mongoose.Model<IOrderDoc> {
  build(attrs: IOrderAttrs): IOrderDoc;
}

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      emum: Object.values(EOrderStatus),
      default: EOrderStatus.Created,
    },
    expiresAt: {
      type: mongoose.Schema.Types.Date,
    },
    ticket: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Ticket',
    },
  },
  {
    toJSON: {
      transform(_doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

orderSchema.set('versionKey', 'version');
orderSchema.plugin(updateIfCurrentPlugin);

orderSchema.statics.build = (attrs: IOrderAttrs) => {
  return new Order(attrs);
};

const Order = mongoose.model<IOrderDoc, IOrderModel>('Order', orderSchema);

export { Order };
export { EOrderStatus };
