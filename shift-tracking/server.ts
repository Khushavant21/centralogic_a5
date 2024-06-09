import 'reflect-metadata';
import { AppDataSource } from './data-source';
import app from './app';
import logger from './utils/logger';

const PORT = process.env.PORT || 3000;

AppDataSource.initialize().then(() => {
    app.listen(PORT, () => {
        logger.info(`Server running on port ${PORT}`);
    });
}).catch((error) => {
    logger.error('Error during Data Source initialization', error);
});
