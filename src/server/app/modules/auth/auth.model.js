import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import timestamp from 'mongoose-timestamp';
import { genSaltSync, hashSync } from 'bcryptjs';

const authSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    default: null
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  acc_type: {
    type: String,
    default: 'user'
  },
  jwt: {
    type: String,
    default: null
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'userModel',
    default: null
  },
  social: {
    facebook: {
      id: String,
      token: String
    },
    twitter: {
      id: String,
      token: String
    },
    google: {
      id: String,
      token: String
    }
  }
});

authSchema.pre('save', function hashPass(next) {
  const account = this;
  let hash;
  if (this.isModified('password') || this.isNew) {
    if (account.password) {
      try {
        const salt = genSaltSync();
        hash = hashSync(account.password, salt);
      } catch (e) {
        return next(e);
      } finally {
        account.password = hash;
      }
    }
  }
  return next();
});

authSchema.plugin(uniqueValidator);
authSchema.plugin(timestamp);

const authModel = mongoose.model('authModel', authSchema);

export default authModel;
