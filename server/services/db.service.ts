import {Pool} from 'pg';
import * as _ from 'lodash';

export default class DbService {
    public static DATABASE_URL = 'postgres://root:root@localhost:5432/tutortemple';
    pool: any;

    constructor() {
        this.pool = new Pool({
            connectionString: process.env.DATABASE_URL || DbService.DATABASE_URL,
        });
    }

    /**
     * Execute query after pool connection completed.
     * @param {string} text - database query.
     * @param {any} params - array of values
     * @param {any} callback - callback function
     * */
    query = (text: string, params: any, callback: any) => {
        return this.pool.query(text, params, callback);
    };

    /**
     * End of connection
     */
    end = () => {
        this.pool.end();
    };

    /**
     * Build find records query using pagination and sorting. It is not support join
     * @param {string} tableName - database table name.
     * @param {any} filters - filters object have following property:
     * cols - It is table columns name array for getting specific column data.
     * sortBy - It is table column name for ordering data
     * orderBy - Order by property set data order in ASC or DESC. By default it is ASC.
     * perPage - Per page property use for set limit.
     * pageNo - Page No property use for set offset.
     * @return {object}
     */
    fnBuildFindQuery = (tableName: string, filters?: any) => {
        // Setup static beginning of query
        let values = [];
        let query = ['SELECT * from ' + tableName];
        if (_.isObject(filters)) {
            if (filters.hasOwnProperty('cols') && _.isArray(filters.cols) && filters.cols.length) {
                // SELECT col1, col2 from tableName
                query = ['SELECT ' + filters.cols.join(', ') + ' from ' + tableName];
            }
            if (filters.hasOwnProperty('where')) {
                // SELECT (col1, col2)/* from tableName where col1=$1, col2=$2
                query.push('WHERE');
                // Create another array storing each set command
                // and assigning a number value for parameterized query
                const set = [];
                Object.keys(filters.where).forEach((key, i) => {
                    set.push(key + ' = $' + (i + 1));
                });
                query.push(set.join(', '));

                // Turn req.body into an array of values
                values = Object.keys(filters.where).map((key) => {
                    return filters.where[key];
                });
            }
            if (filters.hasOwnProperty('sortBy') && filters.sortBy) {
                // SELECT (col1, col2)/* from tableName ORDER BY sortBy
                query.push('ORDER BY ' + filters.sortBy);
            }
            if (filters.hasOwnProperty('orderBy') && filters.orderBy) {
                // SELECT (col1, col2)/* from tableName ORDER BY sortBy orderBy
                query.push(filters.orderBy);
            }
            if (filters.hasOwnProperty('perPage') && filters.perPage &&
                filters.hasOwnProperty('pageNo') && filters.pageNo) {
                const PER_PAGE = filters.perPage;
                const PAGE_NO = (filters.pageNo && filters.pageNo > 0) ? (filters.pageNo - 1) : 0;
                // SELECT (col1, col2)/* from tableName ORDER BY sortBy orderBy LIMIT perPage OFFSET ((perPage - 1) * pageNo)
                query.push('LIMIT ' + PER_PAGE + ' OFFSET ' + PAGE_NO * PER_PAGE);
            }
        }

        // Return a complete query string
        return {text: query.join(' '), values: values};
    };

    /**
     * Build find one record query using by id, email etc.
     * @param {string} tableName - database table name.
     * @param {any} filters - filters object have following property:
     * cols - It is table columns name array for getting specific column data.
     * where - It is object that have key as column name and value as field value.
     * @return {object}
     */
    fnBuildFindOneQuery = (tableName: string, filters?: any) => {
        // Setup static beginning of query
        let query = ['SELECT * from ' + tableName];
        let values = [];
        if (_.isObject(filters)) {
            if (filters.hasOwnProperty('cols') && _.isArray(filters.cols) && filters.cols.length) {
                // SELECT col1, col2 from tableName
                query = ['SELECT ' + filters.cols.join(', ') + ' from ' + tableName];
            }
            if (filters.hasOwnProperty('where')) {
                // SELECT (col1, col2)/* from tableName where col1=$1, col2=$2
                query.push('WHERE');
                // Create another array storing each set command
                // and assigning a number value for parameterized query
                const set = [];
                Object.keys(filters.where).forEach((key, i) => {
                    set.push(key + ' = $' + (i + 1));
                });
                query.push(set.join(', '));

                // Turn req.body into an array of values
                values = Object.keys(filters.where).map((key) => {
                    return filters.where[key];
                });
            }
        }

        // Return a complete query string
        return {text: query.join(' '), values};
    };

    /**
     * Build insert query.
     * @param {string} tableName - database table name.
     * @param {any} object - insert data using json object.
     * @return {object}
     */
    fnBuildInsertQuery = (tableName: string, object: any) => {
        // Remove id property if available because it's auto increment not needed.
        if (object.hasOwnProperty('id')) {
            delete object.id;
        }
        // Setup static beginning of query
        const query = ['INSERT INTO ' + tableName];
        query.push('(' + Object.keys(object).join(', ') + ') VALUES');
        // Create another array storing each set command
        // and assigning a number value for parameterized query
        const set = [];
        Object.keys(object).forEach((key, i) => {
            set.push('$' + (i + 1));
        });
        query.push('(' + set.join(', ') + ') RETURNING *');

        // Turn req.body into an array of values
        const values = Object.keys(object).map((key) => {
            return object[key];
        });

        // Return a complete query string
        return {text: query.join(' '), values};
    };

    /**
     * Build update query.
     * @param {string} tableName - database table name.
     * @param {string} id - unique id for update.
     * @param {any} object - update data using json object.
     * @return {object}
     */
    fnBuildUpdateQuery = (tableName: string, id: number, object: any) => {
        // Remove id property if available because update not needed for id.
        if (object.hasOwnProperty('id')) {
            delete object.id;
        }
        // Setup static beginning of query
        const query = ['UPDATE ' + tableName];
        query.push('SET');

        // Create another array storing each set command
        // and assigning a number value for parameterized query
        const set = [];
        Object.keys(object).forEach((key, i) => {
            set.push(key + ' = ($' + (i + 1) + ')');
        });
        query.push(set.join(', '));

        // Add the WHERE statement to look up by id
        query.push('WHERE id = ' + id + ' RETURNING *');

        // Turn req.body into an array of values
        const values = Object.keys(object).map((key) => {
            return object[key];
        });

        // Return a complete query string
        return {text: query.join(' '), values};
    };

    /**
     * Build find one record query using by id, email etc.
     * @param {string} tableName - database table name.
     * @param {number} id - unique id for find record
     * @return {object}
     */
    fnBuildDeleteQuery = (tableName: string, id?: number) => {
        // Return a complete query string
        return {text: 'DELETE from ' + tableName + ' WHERE id = $1 Returning *', values: [id]};
    };
}
