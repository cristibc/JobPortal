const express = require("express");
const router = express.Router();
const jobPostController = require('../controllers/jobPostController');
const auth = require('../middleware/authenticate');

router.get('/',auth.authenticateToken(), jobPostController.getJobPosts);
router.post('/', auth.authenticateToken('ADMIN'), jobPostController.createJobPost);
router.post('/addOwnJobPost', auth.authenticateToken('COMPANY'), jobPostController.addOwnJobPost);
router.get('/getJobPost/:id', auth.authenticateToken(), jobPostController.getJobPost)
router.put('/updateJobPost/:id', auth.authenticateToken(['ADMIN', 'COMPANY']), jobPostController.updateJobPost)
router.put('/updateOwnJobPost/:id', auth.authenticateToken('COMPANY'), jobPostController.updateOwnJobPost)
router.delete('/deleteJobPost/:id', auth.authenticateToken('ADMIN'), jobPostController.deleteJobPost)
router.delete('/deleteOwnJobPost/:id', auth.authenticateToken('COMPANY'), jobPostController.deleteOwnJobPost)
router.post('/getJobPostsMatching', auth.authenticateToken(), jobPostController.getJobPostsMatching)
router.post('/getJobPostsMatchingWithMinimumSalary', auth.authenticateToken(), jobPostController.getJobPostsMatchingWithMinimumSalary)
router.post('/sortJobPostsBySalary', auth.authenticateToken(), jobPostController.sortJobPostsBySalary)

module.exports = router;
