import { Crud } from '@utl';

import userModel from './user.model';
import { filesCrud } from '../files';
import { authCrud } from '../auth';

class UserService extends Crud {
  constructor(model) {
    super(model);
    this.filesCrud = filesCrud;
    this.authCrud = authCrud;
  }
}

const userCrud = new UserService(userModel);
export default userCrud;
