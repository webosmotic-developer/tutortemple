import SubjectController from './subject.controller';
import Auth from '../../auth/auth';

export default function fnSubjectRoutes(router) {

    const subjectCtrl = new SubjectController();
    const auth = new Auth();

    router.route('/subject')
        .get(auth.fnIsAuthenticated(), subjectCtrl.fnGetSubjects)
        .post(auth.fnIsAuthenticated(), subjectCtrl.fnCreateSubject);
    router.route('/subject/:id')
        .get(auth.fnIsAuthenticated(), subjectCtrl.fnGetSubjectById)
        .put(auth.fnIsAuthenticated(), subjectCtrl.fnUpdateSubject)
        .delete(auth.fnIsAuthenticated(), subjectCtrl.fnDeleteSubject);
}
