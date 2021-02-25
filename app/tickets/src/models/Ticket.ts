import mongoose from 'mongoose';

interface ITicketAttrs {
  title: string;
  price: number;
  userId: string;
}

interface ITicketDoc extends mongoose.Document {
  title: string;
  price: number;
  userId: string;
}

interface ITicketModel extends mongoose.Model<ITicketDoc> {
  build(attrs: ITicketAttrs): ITicketDoc;
}

const ticketSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    userId: {
      type: String,
      required: true,
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

ticketSchema.statics.build = (attrs: ITicketAttrs) => {
  return new Ticket(attrs);
};

const Ticket = mongoose.model<ITicketDoc, ITicketModel>('Ticket', ticketSchema);

export { Ticket };
