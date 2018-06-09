import * as _ from 'lodash';

import DbService from './db.service';

abstract class DAO {

    abstract table: string;

    /**
     * Get All data
     * @param {any} filters - filters object have following property:
     * cols - It is table columns name array for getting specific column data.
     * sortBy - It is table column name for ordering data
     * orderBy - Order by property set data order in ASC or DESC. By default it is ASC.
     * perPage - Per page property use for set limit.
     * pageNo - Page No property use for set offset.
     * @return {object}
     */
    fnFind = (filters?: any) => {
        let query = {
            cols: (_.isObject(filters) && filters.hasOwnProperty('cols') ? filters.cols : []),
            sortBy: (_.isObject(filters) && filters.hasOwnProperty('sortBy') ? filters.sortBy : null),
            orderBy: (_.isObject(filters) && filters.hasOwnProperty('orderBy') ? filters.orderBy : null),
            perPage: (_.isObject(filters) && filters.hasOwnProperty('perPage') ? filters.perPage : 500),
            pageNo: (_.isObject(filters) && filters.hasOwnProperty('pageNo') ? filters.pageNo : 1)
        };
        query = _.assign({}, query, filters);
        return new Promise((resolve, reject) => {
            const db = new DbService();
            const {text, values} = db.fnBuildFindQuery(this.table, query);
            db.query(text, values, (err, res) => {
                db.end();
                if (err) {
                    reject(err);
                } else {
                    resolve(res.rows);
                }
            });
        });
    };

    /**
     * Fetch one record from db
     * @param {number} id.
     * @param {any} cols.
     * @return {object}
     */
    fnFindOne = (id: number, cols?: any) => {
        const query: any = {where: {id: id}};
        if (_.isArray(cols) && cols.length > 0) {
            query.cols = cols;
        }
        const db = new DbService();
        return new Promise((resolve, reject) => {
            const {text, values} = db.fnBuildFindOneQuery(this.table, query);
            db.query(text, values, (err, res) => {
                db.end();
                if (err) {
                    reject(err);
                } else {
                    resolve(res.rows[0]);
                }
            });
        });
    };

    /**
     * Insert new record in db
     * @param {any} body.
     * @return {object}
     */
    fnInsert = (body: any) => {
        const db = new DbService();
        return new Promise((resolve, reject) => {
            const {text, values} = db.fnBuildInsertQuery(this.table, body);
            db.query(text, values,
                (err, res) => {
                    db.end();
                    if (err) {
                        reject(err);
                    } else if (res) {
                        resolve(res.rows[0]);
                    }
                });
        });
    };

    /**
     * Update existing record in db
     * @param {number} id.
     * @param {any} body.
     * @return {object}
     */
    fnUpdate = (id: number, body: any) => {
        const db = new DbService();
        return new Promise((resolve, reject) => {
            const {text, values} = db.fnBuildUpdateQuery(this.table, id, body);
            db.query(text, values,
                (err, res) => {
                    db.end();
                    if (err) {
                        reject(err);
                    } else if (res) {
                        resolve(res.rows[0]);
                    }
                });
        });
    }

    /**
     * Remove one record from db
     * @param {number} id.
     * @return {object}
     */
    fnDelete = (id: number) => {
        const db = new DbService();
        return new Promise((resolve, reject) => {
            const {text, values} = db.fnBuildDeleteQuery(this.table, id);
            db.query(text, values,
                (err, res) => {
                    db.end();
                    if (err) {
                        reject(err);
                    } else if (res) {
                        resolve(res.rows[0]);
                    }
                });
        });
    };

}

export default DAO;
