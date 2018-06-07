export default class Common {

    constructor() {}

    /**
     * Build update query.
     * @param {string} id - request object.
     * @param {object} cols - request object.
     * @param {string} tableName - request object.
     */
    generateUpdateQuery = (id, cols, tableName) => {
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
}
