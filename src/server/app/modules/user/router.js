import { isAuthenticated } from '@mid';
import { userUpdate } from './controller';

export const baseUrl = '/api/user';

export const routes = [
  {
    method: 'PUT',
    route: '/:id',
    handlers: [
      isAuthenticated,
      userUpdate
    ]
  }
];
