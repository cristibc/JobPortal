const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const createJobPost = async (req, res) => {
        try {
            const jobPost = await prisma.jobPost.create({
                data: req.body
              });
            res.status(200).json(jobPost);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
}

const getJobPosts = async (req, res) => {
    try {
        const jobPosts = await prisma.jobPost.findMany();
        res.status(200).json(jobPosts);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const getJobPost = async (req, res) => {
    try {
        const { id } = req.params
        const jobPost = await prisma.jobPost.findUnique({
            where: {
                id: id
            }
        });
        res.status(200).json(jobPost);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const updateJobPost = async (req, res) => {
    try {
        const { id } = req.params
        const jobPost = await prisma.jobPost.update({
            data: req.body,
            where: {
                id: id,
            }
        })

        if (!jobPost) {
            return res.status(404).json({message: "Job post not found"})
        }
        const updatedJobPost = await prisma.jobPost.findUnique({
            where: {
                id: id,
            }
        });
        res.status(200).json(updatedJobPost);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const deleteJobPost = async (req, res) => {
    try {
        const { id } = req.params
        const jobPost = await prisma.jobPost.delete({
            where: {
                id: id,
            }
        });

        if (!jobPost) {
            return res.status(404).json({message: "Job post not found"});
        }

        res.status(200).json({message:"Job post deleted successfully"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports = {
    createJobPost,
    getJobPost,
    getJobPosts,
    updateJobPost,
    deleteJobPost
};
