import mysql,{ Connection } from 'mysql';
import { databaseConfig } from '../../environment';
import { User } from '../models/user-model';


export abstract class ConnectionDatabase{
    protected connection: Connection;
    constructor(){
        this.connection = mysql.createConnection({
            host: databaseConfig.host,
            user: databaseConfig.user,
            password: databaseConfig.password,
            database: databaseConfig.database
        });
        this.connect();
    }
    async connect(){
        try {
            this.connection = mysql.createConnection({
                host: databaseConfig.host,
                user: databaseConfig.user,
                password: databaseConfig.password,
                database: databaseConfig.database
            });
            if(this.connection && this.connection.state !== 'disconnected'){
                return this.connection;
            }
            await this.connection.connect();
            return this.connection
        } catch (error: any) {
            throw new Error('Failed to connect to the database: ' + error.message);
        }
    }
    
    async disconnect(){
        try {
            if(this.connection && this.connection.state !== 'disconnected'){
                await this.connection.end();
            }
        } catch (error: any) {
            throw new Error('Failed to disconnect to the database: ' + error.message);
        }
    };
}

