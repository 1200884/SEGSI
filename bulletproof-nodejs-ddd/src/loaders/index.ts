import expressLoader from './express';
import dependencyInjectorLoader from './dependencyInjector';
import mongooseLoader from './mongoose';
import Logger from './logger';

import config from '../../config';

export default async ({ expressApp }) => {
  const mongoConnection = await mongooseLoader();
  Logger.info('✌️ DB loaded and connected!');

  const userSchema = {
    // compare with the approach followed in repos and services
    name: 'userSchema',
    schema: '../persistence/schemas/userSchema',
  };

  const roleSchema = {
    // compare with the approach followed in repos and services
    name: 'roleSchema',
    schema: '../persistence/schemas/roleSchema',
  };
  const pathSchema = {
    name: 'pathSchema',
    schema: '../persistence/schemas/pathSchema',
  };
  const truckSchema = {
    name: 'truckSchema',
    schema: '../persistence/schemas/truckSchema',
  };

  const roleController = {
    name: config.controllers.role.name,
    path: config.controllers.role.path
  }
  const truckController = {
    name: config.controllers.truck.name,
    path: config.controllers.truck.path
  }
  const pathController = {
    name: config.controllers.path.name,
    path: config.controllers.path.path
  }

  const roleRepo = {
    name: config.repos.role.name,
    path: config.repos.role.path
  }
  const userRepo = {
    name: config.repos.user.name,
    path: config.repos.user.path
  }
  const pathRepo = {
    name: config.repos.path.name,
    path: config.repos.path.path
  }
  const truckRepo = {
    name: config.repos.truck.name,
    path: config.repos.truck.path
  }

  const roleService = {
    name: config.services.role.name,
    path: config.services.role.path
  }
  const truckService = {
    name: config.services.truck.name,
    path: config.services.truck.path
  }
  const pathService = {
    name: config.services.path.name,
    path: config.services.path.path
  }

  await dependencyInjectorLoader({
    mongoConnection,
    schemas: [
      userSchema,
      roleSchema,
      truckSchema,
      pathSchema
    ],
    controllers: [
      roleController,
      truckController,
      pathController
    ],
    repos: [
      roleRepo,
      userRepo,
      truckRepo,
      pathRepo
    ],
    services: [
      roleService,
      truckService,
      pathService
    ]
  });
  Logger.info('✌️ Schemas, Controllers, Repositories, Services, etc. loaded');

  await expressLoader({ app: expressApp });
  Logger.info('✌️ Express loaded');
};
