const express = require("express");
const router = express.Router();
const applicationController = require('../controllers/applicationController');
const auth = require('../middleware/authenticate');

router.get('/', auth.authenticateToken('ADMIN'), applicationController.getApplications);
router.post('/',auth.authenticateToken('ADMIN'), applicationController.createApplication);
router.post('/applyAsUser',auth.authenticateToken('USER'), applicationController.applyAsUser);
router.get('/getApplication/:id', auth.authenticateToken('ADMIN'), applicationController.getApplication);
router.get('/getOwnApplications', auth.authenticateToken('USER'), applicationController.getOwnApplications);
router.put('/updateApplication/:id', auth.authenticateToken('ADMIN'),  applicationController.updateApplication);
router.delete('/deleteApplication/:id', auth.authenticateToken('ADMIN'), applicationController.deleteApplication);
router.delete('/deleteOwnApplication/:id', auth.authenticateToken('USER'), applicationController.deleteOwnApplication);
router.get('/getApplicationsForJobPost/:id', auth.authenticateToken('ADMIN'), applicationController.getApplicationsForJobPost);
router.post('/acceptApplicationsForJobPost', auth.authenticateToken('COMPANY'), applicationController.acceptApplicationsForJobPost);
router.get('/getPage/:page/:countPerPage', auth.authenticateToken(['ADMIN']), applicationController.getApplicationsByPageAndCount)

module.exports = router;
