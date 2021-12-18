import mongoose from 'mongoose';
import { DeviceDetails } from '../interfaces';

interface Attrs {
  url: string;
  user: string;
  analytics: DeviceDetails;
}

interface VisitsDoc extends mongoose.Document, Attrs {}

interface VisitsModel extends mongoose.Model<VisitsDoc> {
  build: (arrs: Attrs) => VisitsDoc;
}

const schema = new mongoose.Schema(
  {
    url: { type: mongoose.SchemaTypes.ObjectId, ref: 'Url', required: true },
    user: { type: mongoose.SchemaTypes.ObjectId, ref: 'User', required: true },
    analytics: { type: Object, required: true },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

schema.statics.build = (attrs: Attrs) => {
  return new Visits(attrs);
};

export const Visits = mongoose.model<VisitsDoc, VisitsModel>('Visits', schema);
