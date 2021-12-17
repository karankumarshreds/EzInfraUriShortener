import mongoose from 'mongoose';

interface Attrs {
  shortUrl: string;
  url: string;
  user: string;
}

interface UrlDoc extends mongoose.Document, Attrs {
  views: number;
  uniqueViews: number;
  createdAt: Date;
  updatedAt: Date;
}

interface UrlModel extends mongoose.Model<UrlDoc> {
  build: (arrs: Attrs) => UrlDoc;
}

const schema = new mongoose.Schema(
  {
    shortUrl: { type: String, required: true },
    url: { type: String, required: true },
    user: { type: mongoose.SchemaTypes.ObjectId, ref: 'User', required: true },
    views: { type: Number, default: 0 },
    uniqueViews: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() },
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
  return new Url(attrs);
};

export const Url = mongoose.model<UrlDoc, UrlModel>('Url', schema);
