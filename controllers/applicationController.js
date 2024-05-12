const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const createApplication = async (req, res) => {
        try {
            const application = await prisma.application.create({
                data: {
                    jobPost: {
                        connect: {
                            id: req.body.jobPostId
                        }
                    },
                    user: {
                        connect: {
                            id: req.body.userId
                        }
                    },
                },
              });
            res.status(200).json(application);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
}

const getApplications = async (req, res) => {
    try {
        const applications = await prisma.application.findMany({
            include: {
                jobPost: true,
                user: true
            },
        });
        res.status(200).json(applications);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const getApplication = async (req, res) => {
    try {
        const { id } = req.params
        const application = await prisma.application.findUnique({
            where: {
                id: id
            },
            include: {
                jobPost: true,
                user: true,
            }
        });
        res.status(200).json(application);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const updateApplication = async (req, res) => {
    try {
        const { id } = req.params
        const application = await prisma.application.update({
            data: {
                jobPost: {
                    connect: {
                        id: req.body.jobPostId
                    }
                },
                user: {
                    connect: {
                        id: req.body.userId
                    }
                },
            },
            where: {
                id: id,
            }
        })

        if (!application) {
            return res.status(404).json({message: "Application not found"})
        }
        const updatedApplication = await prisma.application.findUnique({
            where: {
                id: id,
            }
        });
        res.status(200).json(updatedApplication);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const deleteApplication = async (req, res) => {
    try {
        const { id } = req.params
        const application = await prisma.application.delete({
            where: {
                id: id,
            }
        });

        if (!application) {
            return res.status(404).json({message: "Application not found"});
        }

        res.status(200).json({message:"Application deleted successfully"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}



module.exports = {
    createApplication,
    getApplication,
    getApplications,
    updateApplication,
    deleteApplication
};
