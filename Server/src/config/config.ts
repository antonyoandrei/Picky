import dotenv from 'dotenv';

type TConfig = {
    [key: string]: EnvironmentConfig;
};

type EnvironmentConfig = {
    app: AppConfig;
    db: MongoDBConfig;
}

type AppConfig = {
    PORT: string | number;
}

type MongoDBConfig = {
    URI: string;
}

if (process.env.NODE_ENV === 'production') {
    dotenv.config({path: '.env.production'})
} else {
    dotenv.config({path: '.env.development'})
}

const ENV = process.env.NODE_ENV ?? 'development';

const CONFIG: TConfig = {
    development: {
        app: {
            PORT: process.env.PORT || 4001
        },
        db: {
            URI:
                process.env.MONGO_URI_DEV ||
                'mongodb://localhost:27017/test_development'
        }
    },
    production: {
        app: {
            PORT: process.env.PORT || 4002
        },
        db: {
            URI:
                process.env.MONGO_URI_DEV ||
                'mongodb://localhost:27017/test_production'
        }
    }
}

export default CONFIG[ENV]
