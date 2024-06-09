import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Application } from 'express';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Shift Tracking API',
            version: '1.0.0',
        },
    },
    apis: ['./src/routes/*.ts', './src/entities/*.ts'],
};

const specs = swaggerJSDoc(options);

export const setupSwagger = (app: Application) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};
