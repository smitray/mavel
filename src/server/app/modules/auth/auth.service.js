import { Crud } from '@utl';

import authModel from './auth.model';
import { userCrud } from '../user';

class AuthService extends Crud {
  constructor(model) {
    super(model);
    this.userCrud = userCrud;
  }
}

const authCrud = new AuthService(authModel);
export default authCrud;
