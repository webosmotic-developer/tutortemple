import SubjectDAO from './subject.dao';

export default class SubjectService {
    subjectDAO = new SubjectDAO();

    /**
     * Get all subjects
     */
    fnGetSubjects = (req) => {
        const categoryId = req.query.category_id;
        return new Promise((resolve, reject) => {
            this.subjectDAO
                .fnGetSubjects(categoryId)
                .then(subject => resolve(subject))
                .catch(error => {
                    reject(error);
                });
        });
    }

    /**
     * Get single subject info by id.
     * @param {object} req
     */
    fnGetSubjectById = (req) => {
        const subjectId = req.params.id;
        return new Promise((resolve, reject) => {
            this.subjectDAO
                .fnGetSubjectById(subjectId)
                .then(subject => resolve(subject))
                .catch(error => {
                    reject(error);
                });
        });
    }

    /**
     * Update existing subject.
     * @param {object} req - request object.
     */
    fnCreateSubject = (req) => {
        const subjectObj = req.body;
        return new Promise((resolve, reject) => {
            this.subjectDAO
                .fnCreateSubject(subjectObj)
                .then(subject => resolve(subject))
                .catch(error => {
                    reject(error);
                });
        });
    }

    /**
     * Update existing subject.
     * @param {object} req - request object.
     */
    fnUpdateSubject = (req) => {
        const subjectId = req.params.id;
        const subjectObj = req.body;
        return new Promise((resolve, reject) => {
            this.subjectDAO
                .fnUpdateSubject(subjectId, subjectObj)
                .then(subject => resolve(subject))
                .catch(error => {
                    reject(error);
                });
        });
    }

    /**
     * Delete subject.
     * @param {object} req - request object.
     */
    fnDeleteSubject = (req) => {
        const subjectId = req.params.id;
        return new Promise((resolve, reject) => {
            this.subjectDAO
                .fnDeleteSubject(subjectId)
                .then(subject => resolve(subject))
                .catch(error => {
                    reject(error);
                });
        });
    }
}
