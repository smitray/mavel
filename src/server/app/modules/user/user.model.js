import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import timestamp from 'mongoose-timestamp';

const userSchema = new mongoose.Schema({
  full_name: {
    type: String,
    default: null
  },
  dp: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'filesModel',
    default: null
  }
});

userSchema.plugin(uniqueValidator);
userSchema.plugin(timestamp);

const userModel = mongoose.model('userModel', userSchema);

export default userModel;
