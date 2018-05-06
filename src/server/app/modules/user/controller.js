import { userCrud } from './';


let user;

const userUpdate = async (ctx) => {
  try {
    user = await userCrud.put({
      params: {
        qr: {
          _id: ctx.state.user.uid
        }
      },
      body: ctx.request.body
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
        user
      },
      message: 'user updated successfully'
    };
  }
};

export {
  userUpdate
};
