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

/**
@api {post} /api/auth/local Local Signup and Login
@apiName Local Authentication
@apiGroup Authentication
@apiParam {String} name User's full name
@apiParam {String} username User's username
@apiParam {String} password User's password
@apiParam {String} email User's email
@apiParam {String} [accType="user"] User's account type
@apiParam {Boolean} [signp=false] To toggle between signup and login
@apiParamExample {json} Signup
{
  "name": "John Doe",
  "username": "johndoe",
  "password": "test1234",
  "email": "john@doe.com",
  "accType": "admin",
  "signup": true
}
@apiParamExample {json} Login
{
  "username": "johndoe", //Username or email as value but key should be "username"
  "password": "test1234"
}
@apiSuccessExample {json} Success
{
  "success": 1,
  "data": {
    "token": "Bearer JWT token"
  },
  "message": "Loggedin successfully"
}
@apiErrorExample {json} Server error
  HTTP/1.1 500 Internal Server Error
@apiErrorExample {json} Email or Username exists
  HTTP/1.1 409 Record conflict
@apiErrorExample {json} Wrong credentials
  HTTP/1.1 401 Not authorized
@apiErrorExample {json} Wrong form key
  HTTP/1.1 422 Unprocessable entity
*/

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
      user = await userCrud.create({
        full_name: name
      });
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
  let uid = auth.user;
  if (user) {
    uid = user._id;
  }
  const token = await tokenGenerator({
    auth: auth._id,
    uid,
    acc_type: auth.acc_type
  });
  ctx.body = {
    success: 1,
    data: {
      token
    },
    message: 'Loggedin successfully'
  };
};

/**
@api {post} /api/auth/social Social Signup and Login
@apiName Social Authentication
@apiGroup Authentication
@apiParam {String} name User's full name
@apiParam {String} username User's username
@apiParam {String} email User's email
@apiParam {String} scId Social network ID
@apiParam {String} scToken Social network token
@apiParam {String} scType Name of the social network
@apiParamExample {json} Input
{
  "name": "John Doe",
  "username": "johndoe",
  "email": "john@doe.com",
  "scId": "123456789",
  "scToken": "123456789",
  "scType": "facebook" // Or twitter / google
}
@apiSuccessExample {json} Success
{
  "success": 1,
  "data": {
    "token": "Bearer JWT token"
  },
  "message": "Loggedin successfully"
}
@apiErrorExample {json} Server error
  HTTP/1.1 500 Internal Server Error
@apiErrorExample {json} Email or Username exists
  HTTP/1.1 409 Record conflict
@apiErrorExample {json} Wrong credentials
  HTTP/1.1 401 Not authorized
@apiErrorExample {json} Wrong form key
  HTTP/1.1 422 Unprocessable entity
*/

const authSocial = async (ctx) => {
  const {
    name,
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
      user = await userCrud.create({
        full_name: name
      });
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
  ctx.body = {
    success: 1,
    data: {
      token
    },
    message: 'Loggedin successfully'
  };
};

/**
@api {get} /api/auth Get my details
@apiName Get me
@apiGroup User
@apiHeader {String} Authorization JWT
@apiHeaderExample Header example
{
  "Authorization": "Bearer JWT"
}
@apiSuccessExample {json} Success
{
  "success": 1,
  "data": {
    "user": [Object]
  },
  "message": "User details fetched successfully"
}
@apiErrorExample {json} Server error
  HTTP/1.1 500 Internal Server Error
@apiErrorExample {json} Email or Username exists
  HTTP/1.1 404 No record found
@apiErrorExample {json} Wrong credentials
  HTTP/1.1 401 Not authorized
 */

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
        user: auth
      },
      message: 'Fetched my details successfully'
    };
  }
};

/**
@api {get} /api/auth/:id Get other's details
@apiName Get other
@apiGroup User
@apiHeader {String} Authorization JWT
@apiHeaderExample Header example
{
  "Authorization": "Bearer JWT"
}
@apiSuccessExample {json} Success
{
  "success": 1,
  "data": {
    "user": [Object]
  },
  "message": "User details fetched successfully"
}
@apiErrorExample {json} Server error
  HTTP/1.1 500 Internal Server Error
@apiErrorExample {json} Email or Username exists
  HTTP/1.1 404 No record found
@apiErrorExample {json} Wrong credentials
  HTTP/1.1 401 Not authorized
 */

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
        user: auth
      },
      message: 'User details fetched successfully'
    };
  }
};

/**
@api {put} /api/auth/ Update auth module
@apiName Get other
@apiGroup Authentication
@apiHeader {String} Authorization JWT
@apiHeaderExample Header example
{
  "Authorization": "Bearer JWT"
}
@apiParam {String} password User's password
@apiParam {String} email User's email
@apiParamExample {json} Input
{
  "email": "john@doe.com",
  "password": "test123456"
}
@apiSuccessExample {json} Success
{
  "success": 1,
  "data": {
    "auth": [Object]
  },
  "message": "auth updated successfully"
}
@apiErrorExample {json} Server error
  HTTP/1.1 500 Internal Server Error
@apiErrorExample {json} Email or Username exists
  HTTP/1.1 404 No record found
@apiErrorExample {json} Wrong credentials
  HTTP/1.1 401 Not authorized
@apiErrorExample {json} Wrong credentials
  HTTP/1.1 422 Unprocessable entity
 */

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
