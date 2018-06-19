import { isAuthenticated } from '@mid';
import { userUpdate } from './';

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
