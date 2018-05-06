import _ from 'lodash';
import { compareSync } from 'bcryptjs';
import { generateJwt } from '@utl';
import { authCrud } from './';
import { userCrud } from '../user';


let auth;
let jwt;
let user;

const tokenGenerator = async (data) => {
  jwt = await generateJwt(data);

  await authCrud.put({
    params: {
      qr: {
        _id: data.auth
      }
    },
    body: {
      jwt
    }
  });
  return jwt;
};

const authLocal = async (ctx) => {
  const {
    name,
    username,
    password,
    email,
    accType,
    signup
  } = ctx.request.body;
  auth = await authCrud.single({
    qr: {
      $or: [{
        username
      }, {
        email: username
      }]
    }
  });
  if (signup && !auth) {
    try {
      user = await userCrud.create({});
      auth = await authCrud.create({
        name,
        username,
        password,
        email,
        acc_type: accType,
        user: user._id
      });
    } catch (e) {
      ctx.throw(422, {
        success: 0,
        message: e.message
      });
    }
  } else if (signup && auth) {
    ctx.throw(409, { success: 0, message: 'Email or username already registered!!' });
  } else if (!auth) {
    ctx.throw(401, { success: 0, message: 'No user found' });
  } else if (auth && !compareSync(password, auth.password)) {
    ctx.throw(401, { success: 0, message: 'Password given is wrong' });
  }
  const token = await tokenGenerator({
    auth: auth._id,
    uid: user._id,
    acc_type: auth.acc_type
  });
  ctx.cookies.set('token', token);
  ctx.body = {
    success: 1,
    data: {
      token
    },
    message: 'Loggedin successfully'
  };
};

const authSocial = async (ctx) => {
  const {
    username,
    email,
    scId,
    scToken,
    scType
  } = ctx.request.body;

  const qr = {};
  qr.username = username;
  qr[`social.${scType}.id`] = scId;

  auth = await authCrud.single({
    qr
  });

  if (!auth) {
    try {
      user = await userCrud.create({});
      auth = await authCrud.create({
        username,
        email,
        user: user._id,
        social: {
          [scType]: {
            id: scId,
            token: scToken
          }
        }
      });
    } catch (e) {
      ctx.throw(422, {
        success: 0,
        message: e.message
      });
    }
  }

  const token = await tokenGenerator({
    auth: auth._id,
    uid: user._id,
    acc_type: auth.acc_type
  });
  ctx.cookies.set('token', token);
  ctx.body = {
    success: 1,
    data: {
      token
    },
    message: 'Loggedin successfully'
  };
};

const authSingle = async (ctx) => {
  try {
    auth = await authCrud.single({
      qr: {
        _id: ctx.state.user.auth
      },
      select: 'username email acc_type, user',
      populate: [{
        path: 'user',
        model: 'userModel',
        select: 'full_name dp',
        populate: [{
          path: 'dp',
          model: 'filesModel'
        }]
      }]
    });
  } catch (e) {
    ctx.throw(404, {
      success: 0,
      message: e.message
    });
  } finally {
    ctx.body = {
      success: 1,
      data: {
        auth
      },
      message: 'Fetched my details successfully'
    };
  }
};

const authSingleOther = async (ctx) => {
  try {
    auth = await authCrud.single({
      qr: {
        _id: ctx.params.id
      },
      select: 'username email acc_type, user',
      populate: [{
        path: 'user',
        model: 'userModel',
        select: 'full_name dp',
        populate: [{
          path: 'dp',
          model: 'filesModel'
        }]
      }]
    });
  } catch (e) {
    ctx.throw(404, {
      success: 0,
      message: e.message
    });
  } finally {
    ctx.body = {
      success: 1,
      data: {
        auth
      },
      message: 'User details fetched successfully'
    };
  }
};

const authUpdate = async (ctx) => {
  try {
    const body = _.pick(ctx.request.body, ['password', 'email']);
    auth = await authCrud.put({
      params: {
        qr: {
          _id: ctx.state.user.auth
        }
      },
      body
    });
  } catch (e) {
    ctx.throw(422, {
      success: 0,
      message: e.message
    });
  } finally {
    ctx.body = {
      success: 1,
      data: {
        auth
      },
      message: 'auth updated successfully'
    };
  }
};


export {
  authSingle,
  authSingleOther,
  authUpdate,
  authLocal,
  authSocial
};
