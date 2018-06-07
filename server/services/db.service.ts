import {Pool} from 'pg';

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
     * @param {object} params - array of values
     * @param {function} callback
     * */
    query = (text, params, callback) => {
        return this.pool.query(text, params, callback);
    }

    /**
     * End of connection
     */
    end = () => {
        this.pool.end();
    }

    /**
     * Build insert query.
     * @param {string} tableName - database table name.
     * @param {object} object - insert data using json object.
     */
    fnBuildInsertQuery = (tableName, object) => {
        // Remove id property if available because it's auto increment not needed.
        if (cols.hasOwnProperty('id')) {
            delete cols.id;
        }
        // Setup static beginning of query
        const query = ['INSERT INTO ' + tableName];
        query.push('(' + Object.keys(cols).join(', ') + ') VALUES');
        // Create another array storing each set command
        // and assigning a number value for parameterized query
        const set = [];
        Object.keys(cols).forEach((key, i) => {
            set.push('$' + (i + 1));
        });
        query.push('(' + set.join(', ') + ') RETURNING *');

        // Turn req.body into an array of values
        const values = Object.keys(cols).map((key) => {
            return cols[key];
        });

        // Return a complete query string
        return {text: query.join(' '), values};
    }

    /**
     * Build update query.
     * @param {string} tableName - database table name.
     * @param {string} id - unique id for update.
     * @param {object} object - update data using json object.
     */
    fnBuildUpdateQuery = (tableName, id, object) => {
        // Remove id property if available because update not needed for id.
        if (cols.hasOwnProperty('id')) {
            delete cols.id;
        }
        // Setup static beginning of query
        const query = ['UPDATE ' + tableName];
        query.push('SET');

        // Create another array storing each set command
        // and assigning a number value for parameterized query
        const set = [];
        Object.keys(cols).forEach((key, i) => {
            set.push(key + ' = ($' + (i + 1) + ')');
        });
        query.push(set.join(', '));

        // Add the WHERE statement to look up by id
        query.push('WHERE id = ' + id + ' RETURNING *');

        // Turn req.body into an array of values
        const values = Object.keys(cols).map((key) => {
            return cols[key];
        });

        // Return a complete query string
        return {text: query.join(' '), values};
    }

    /**
     * Build find records query using pagination and sorting.
     * @param {string} tableName - database table name.
     * @param {object} filters - filters object have following property:
     * cols - It is table columns name array for getting specific column data.
     * sortBy - It is table column name for ordering data
     * orderBy - Order by property set data order in ASC or DESC. By default it is ASC.
     * perPage - Per page property use for set limit.
     * pageNo - Page No property use for set offset.
     */
    fnBuildFindQuery = (tableName, filters?: object) => {
        // Setup static beginning of query
        let query = ['SELECT * from ' + tableName];
        if (filters) {
            if (filters.hasOwnProperty('cols')) {
                // SELECT col1, col2 from tableName
                query = ['SELECT ' + filters.cols.join(', ') + ' from ' + tableName];
            }
            if (filters.hasOwnProperty('sortBy')) {
                // SELECT (col1, col2)/* from tableName ORDER BY sortBy
                query.push('ORDER BY ' + filters.sortBy);
            }
            if (filters.hasOwnProperty('orderBy')) {
                // SELECT (col1, col2)/* from tableName ORDER BY sortBy orderBy
                query.push(filters.orderBy);
            }
            if (filters.hasOwnProperty('perPage') && filters.hasOwnProperty('pageNo')) {
                const PER_PAGE = filters.perPage;
                const PAGE_NO = (filters.pageNo && filters.pageNo > 0) ? (filters.pageNo - 1) : 0;
                // SELECT (col1, col2)/* from tableName ORDER BY sortBy orderBy LIMIT perPage OFFSET ((perPage - 1) * pageNo)
                query.push('LIMIT ' + PER_PAGE + ' OFFSET ' + PAGE_NO * PER_PAGE);
            }
        }

        // Return a complete query string
        return {text: query.join(' ')};
    }
}
