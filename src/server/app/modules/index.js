import Router from 'koa-router';

import { filesRouteProps } from './files';
import { userRouteProps } from './user';
import { authRouteProps } from './auth';

const routerControllPros = [
  filesRouteProps,
  userRouteProps,
  authRouteProps
];

// const ioControlProps = [
//
// ];

const ioControl = (app) => {
  app.io.on('connection', (socket) => {
    console.log('A user connected');

    setTimeout(() => {
      socket.emit('testerEvent', { description: 'A custom event named testerEvent!' });
    }, 4000);

    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
  });
};

let instance;

const routerControl = (app) => {
  routerControllPros.forEach((routeProperty) => {
    instance = new Router({ prefix: routeProperty.baseUrl });
    routeProperty.routes.forEach((config) => {
      const {
        method = '',
        route = '',
        handlers = []
      } = config;

      const lastHandler = handlers.pop();

      instance[method.toLowerCase()](route, ...handlers, async (ctx) => {
        const hddd = await lastHandler(ctx);
        return hddd;
      });

      app
        .use(instance.routes())
        .use(instance.allowedMethods());
    });
  });
};

export {
  routerControl,
  ioControl
};
