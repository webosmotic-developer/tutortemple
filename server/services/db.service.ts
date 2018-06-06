import {Pool} from 'pg';

export default class DbService {
    public static DATABASE_URL = 'postgres://root:root@localhost:5432/tutortemple';
    pool: any;

    constructor() {
        this.pool = new Pool({
            connectionString: process.env.DATABASE_URL || DbService.DATABASE_URL,
        });
    }

    query = (text, params, callback) => {
        return this.pool.query(text, params, callback);
    }

    end = () => {
        this.pool.end();
    }
}
