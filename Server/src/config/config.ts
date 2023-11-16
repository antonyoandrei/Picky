import dotenv from 'dotenv';
import Configuration from '../interfaces/config.interfaces';
dotenv.config();

const ENV = process.env.NODE_ENV || 'development';

const CONFIG: Configuration = {
    development: {
        app: {
            PORT: process.env.PORT || 4001
        },
        db: {
            uri:
                process.env.MONGO_URI_DEV ||
                'mongodb://localhost:27017/test_development'
        },
        auth0: {
            client_origin: process.env.APP_ORIGIN,
            audience: process.env.AUTH0_AUDIENCE,
            issuer: process.env.AUTH0_ISSUER
        }
    },
    production: {
        app: {
            PORT: process.env.PORT || 4002
        },
        db: {
            uri:
                process.env.MONGO_URI_DEV ||
                'mongodb://localhost:27017/test_production'
        },
        auth0: {
            client_origin: process.env.APP_ORIGIN,
            audience: process.env.AUTH0_AUDIENCE,
            issuer: process.env.AUTH0_ISSUER
        }
    }
}

export default CONFIG[ENV]
