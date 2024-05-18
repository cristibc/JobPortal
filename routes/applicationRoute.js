const express = require("express");
const router = express.Router();
const applicationController = require('../controllers/applicationController');

router.get('/', applicationController.getApplications);
router.post('/', applicationController.createApplication);
router.get('/:id', applicationController.getApplication);
router.put('/:id', applicationController.updateApplication);
router.delete('/:id', applicationController.deleteApplication);
router.get('/getApplicationsForJobPost/:id', applicationController.getApplicationsForJobPost);

module.exports = router;
