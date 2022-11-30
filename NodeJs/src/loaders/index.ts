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

  const truckSchema = {
    // compare with the approach followed in repos and services
    name: 'truckSchema',
    schema: '../persistence/schemas/truckSchema',
  };

  const pathSchema = {
    // compare with the approach followed in repos and services
    name: 'pathSchema',
    schema: '../persistence/schemas/pathSchema',
  };

  const packagingSchema = {
    // compare with the approach followed in repos and services
    name: 'packagingSchema',
    schema: '../persistence/schemas/packagingSchema',
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

  const packagingController = {
    name: config.controllers.packaging.name,
    path: config.controllers.packaging.path
  }

  const planningController = {
    name: config.controllers.planning.name,
    path: config.controllers.planning.path
  }

  const roleRepo = {
    name: config.repos.role.name,
    path: config.repos.role.path
  }

  const userRepo = {
    name: config.repos.user.name,
    path: config.repos.user.path
  }

  const truckRepo = {
    name: config.repos.truck.name,
    path: config.repos.truck.path
  }
 
  const pathRepo = {
    name: config.repos.path.name,
    path: config.repos.path.path
  }

  const packagingRepo = {
    name: config.repos.packaging.name,
    path: config.repos.packaging.path
  }

  const planningRepo = {
    name: config.repos.planning.name,
    path: config.repos.planning.path
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

  const packagingService = {
    name: config.services.packaging.name,
    path: config.services.packaging.path
  }
  const planningController = {
    name: config.controllers.planning.name,
    path: config.controllers.planning.path
  }
const planningRepo = {
    name: config.repos.planning.name,
    path: config.repos.planning.path
  }
const planningService = {
    name: config.services.planning.name,
    path: config.services.planning.path
  }

  const planningService = {
    name: config.services.planning.name,
    path: config.services.planning.path
  }

  await dependencyInjectorLoader({
    mongoConnection,
    schemas: [
      userSchema,
      roleSchema,
      truckSchema,
      pathSchema,
      packagingSchema,
      //planningSchema
    ],
    controllers: [
      roleController,
      truckController,
      pathController,
      packagingController,
      planningController
    ],
    repos: [
      roleRepo,
      userRepo,
      truckRepo,
      pathRepo,
      packagingRepo,
      planningRepo
    ],
    services: [
      roleService,
      truckService,
      pathService,
      packagingService,
      planningService
<<<<<<< HEAD
    ]  });
=======
    ]
  });
>>>>>>> 54095912af589d2d554ee30f7d9b26d1d953b7d3
  Logger.info('✌️ Schemas, Controllers, Repositories, Services, etc. loaded');

  await expressLoader({ app: expressApp });
  Logger.info('✌️ Express loaded');
};
