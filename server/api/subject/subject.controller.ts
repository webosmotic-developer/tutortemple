import SubjectService from './subject.service';

export default class SubjectController {
    subjectService = new SubjectService();

    /**
     * Get a subject.
     * @param {object} req - request object.
     * @param {object} res - response object.
     */
    fnGetSubjectById = (req, res) => {
        this.subjectService
            .fnGetSubjectById(req)
            .then(subject => res.status(201).json(subject))
            .catch(error => {
                console.error('SubjectController:fnGetSubjectById ', error);
                res.status(422).json({message: error});
            });
    }

    /**
     * Create subject.
     * @param {object} req - request object.
     * @param {object} res - response object.
     */
    fnCreateSubject = (req, res) => {
        this.subjectService
            .fnCreateSubject(req)
            .then(subject => res.status(200).json(subject))
            .catch(error => {
                console.error('SubjectController:fnCreateSubject', error);
                res.status(400).json({message: error});
            });
    }

    /**
     * Update existing subject.
     * @param {object} req - request object.
     * @param {object} res - response object.
     */
    fnUpdateSubject = (req, res) => {
        this.subjectService
            .fnUpdateSubject(req)
            .then(subject => res.status(200).json(subject))
            .catch(error => {
                console.error('SubjectController:fnUpdateSubject', error);
                res.status(400).json({message: error});
            });
    }

    /**
     * Get all subject
     * @param {object} req - request object.
     * @param {object} res - response object.
     */
    fnGetSubjects = (req, res) => {
        this.subjectService
            .fnGetSubjects(req)
            .then(subjects => res.status(200).json(subjects))
            .catch(error => {
                console.error('SubjectController:fnUpdateSubject', error);
                res.status(400).json({message: error});
            });
    }

    /**
     * Delete subject
     * @param {object} req - request object.
     * @param {object} res - response object.
     */
    fnDeleteSubject = (req, res) => {
        this.subjectService
            .fnDeleteSubject(req)
            .then(subject => res.status(200).json(subject))
            .catch(error => {
                console.error('SubjectController:fnUpdateSubject', error);
                res.status(400).json({message: error});
            });
    }
}
