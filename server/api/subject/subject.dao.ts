import DbService from '../../services/db.service';
import DAO from '../../services/dao.service';

export default class SubjectDAO extends DAO {

    table = 'subjects';
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
            this.fnFindOne(id)
                .then((res) => resolve(res))
                .catch((err) => reject(err));
        });
    }

    /**
     * Create subject.
     * @param {object} subject - request object.
     */
    fnCreateSubject = (subject) => {
        const db = new DbService();
        return new Promise((resolve, reject) => {
            this.fnInsert(subject)
                .then((res) => resolve(res))
                .catch((err) => reject(err));
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
            this.fnUpdate(subjectId, subject)
                .then((res) => resolve(res))
                .catch((err) => reject(err));
        });
    }

    /**
     * Delete subject.
     * @param {string} subjectId - request object.
     */
    fnDeleteSubject = (subjectId) => {
        const db = new DbService();
        return new Promise((resolve, reject) => {
            this.fnDelete(subjectId)
                .then((res) => resolve(res))
                .catch((err) => reject(err));
        });
    }
}
