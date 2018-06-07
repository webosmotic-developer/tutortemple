import DbService from '../../services/db.service';

export default class SubjectDAO {

    /**
     * Get all subjects.
     */
    fnGetSubjects = (categoryId?: string) => {
        const db = new DbService();
        let text = 'SELECT * FROM subjects';
        if (categoryId) {
            text = text + ' WHERE category_id = ' + categoryId;
        }
        return new Promise((resolve, reject) => {
            db.query(text, null, (err, res) => {
                db.end();
                if (err) {
                    reject(err);
                } else {
                    if (res.rows.length > 0) {
                        resolve(res.rows);
                    } else {
                        resolve([]);
                    }
                }
            });
        });
    }

    /**
     * Get single subject info by id.
     * @param {number} id
     */
    fnGetSubjectById = (id) => {
        const db = new DbService();
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM subjects WHERE id = $1', [id], (err, res) => {
                db.end();
                if (err) {
                    reject(err);
                } else {
                    if (res.rows.length > 0) {
                        resolve(res.rows[0]);
                    } else {
                        reject({
                            message: {
                                name: 'error',
                                detail: 'Subject doesn\'t exist',
                            }
                        });
                    }
                }
            });
        });
    }

    /**
     * Create subject.
     * @param {object} subject - request object.
     */
    fnCreateSubject = (subject) => {
        const db = new DbService();
        return new Promise((resolve, reject) => {
            const {text, values } = db.fnBuildInsertQuery('subjects', subject);
            db.query(text, values,
                (err, res) => {
                    db.end();
                    if (err) {
                        reject(err);
                    } else if (res) {
                        if (res.rows.length > 0) {
                            resolve(res.rows[0]);
                        } else {
                            reject({
                                message: {
                                    name: 'error',
                                    detail: 'Subject doesn\'t exist',
                                }
                            });
                        }
                    }
                });
        });
    }

    /**
     * Update existing subject.
     * @param {string} subjectId - request object.
     * @param {object} subject - request object.
     */
    fnUpdateSubject = (subjectId, subject) => {
        const db = new DbService();
        return new Promise((resolve, reject) => {
            const {text, values } = db.fnBuildUpdateQuery('subjects', subjectId, subject);
            db.query(text, values,
                (err, res) => {
                    db.end();
                    if (err) {
                        reject(err);
                    } else if (res) {
                        if (res.rows.length > 0) {
                            resolve(res.rows[0]);
                        } else {
                            reject({
                                message: {
                                    name: 'error',
                                    detail: 'Subject doesn\'t exist',
                                }
                            });
                        }
                    }
                });
        });
    }

    /**
     * Delete subject.
     * @param {string} subjectId - request object.
     */
    fnDeleteSubject = (subjectId) => {
        const db = new DbService();
        return new Promise((resolve, reject) => {
            db.query('Delete from subjects where id = $1 Returning *', [subjectId],
                (err, res) => {
                    db.end();
                    if (err) {
                        reject(err);
                    } else if (res) {
                        if (res.rows.length > 0) {
                            resolve(res.rows[0]);
                        } else {
                            reject({
                                message: {
                                    name: 'error',
                                    detail: 'Subject doesn\'t exist',
                                }
                            });
                        }
                    }
                });
        });
    }
}
