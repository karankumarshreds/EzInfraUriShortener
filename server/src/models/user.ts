import mongoose from 'mongoose';

interface Attrs {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface UserDoc extends mongoose.Document, Attrs {
  owner: null | string;
  admin: string[];
}

interface UserModel extends mongoose.Model<UserDoc> {
  build: (attrs: Attrs) => UserDoc;
}

const schema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
      },
    },
  }
);

// // hash the password before saving the schema
// schema.pre('save', async function (done) {
//   if (this.isModified('password')) {
//     const hashedPassword = await hashPassword(this.get('password'));
//     this.set('password', hashedPassword);
//   }
//   done();
// });

schema.statics.build = (attrs: Attrs) => {
  return new User(attrs);
};

export const User = mongoose.model<UserDoc, UserModel>('User', schema);
