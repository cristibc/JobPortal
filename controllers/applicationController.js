const { PrismaClient, JobPostStatus } = require("@prisma/client");
const prisma = new PrismaClient();

const createApplication = async (req, res) => {
  try {
    const application = await prisma.application.create({
      data: {
        jobPost: {
          connect: {
            id: req.body.jobPostId,
          },
        },
        user: {
          connect: {
            id: req.body.userId,
          },
        },
      },
    });
    res.status(200).json({ message: application});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const applyAsUser = async (req, res) => {
  try {
    const application = await prisma.application.create({
      data: {
        jobPost: {
          connect: {
            id: req.body.jobPostId,
          },
        },
        user: {
          connect: {
            id: req.user.id,
          },
        },
      },
    });
    return res.status(200).json({ message: application });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getApplications = async (req, res) => {
  try {
    const applications = await prisma.application.findMany({
      include: {
        jobPost: true,
        user: true,
        jobPost: {
          include: {
            company: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getOwnApplications = async (req, res) => {
  try {
    const applications = await prisma.application.findMany({
      where: {
        userId: req.user.id,
      },
      include: {
        jobPost: true,
        user: true,
        jobPost: {
          include: {
            company: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const application = await prisma.application.findUnique({
      where: {
        id: id,
      },
      include: {
        jobPost: true,
        user: true,
      },
    });
    res.status(200).json(application);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const application = await prisma.application.update({
      data: {
        jobPost: {
          connect: {
            id: req.body.jobPostId,
          },
        },
        user: {
          connect: {
            id: req.body.userId,
          },
        },
      },
      where: {
        id: id,
      },
    });

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }
    const updatedApplication = await prisma.application.findUnique({
      where: {
        id: id,
      },
    });
    res.status(200).json(updatedApplication);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const application = await prisma.application.delete({
      where: {
        id: id,
      },
    });

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }
    res.status(200).json({ message: "Application deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteOwnApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const application = await prisma.application.delete({
      where: {
        id: req.user.id,
      },
    });

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }
    res.status(200).json({ message: "Application deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getApplicationsForJobPost = async (req, res) => {
  try {
    const applications = await prisma.application.findMany({
      where: {
        jobPostId: {
          equals: req.body.jobPostId,
        },
      },
      include: {
        // Job Post info shouldn't be needed
        // jobPost: true,
        user: true,
      },
    });
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const acceptApplicationsForJobPost = async (req, res) => {
  if (typeof req.body.acceptedUsers === "string") {
    req.body.acceptedUsers = Array(req.body.acceptedUsers);
  }
  try {
    const [acceptApplicants, rejectApplicants, updateJobPostStatus] =
      await prisma.$transaction([
        prisma.application.updateMany({
          where: {
            userId: {
              in: req.body.acceptedUsers,
            },
            jobPostId: {
              equals: req.body.jobPostId,
            },
            jobPost:
            {
              company: {
                createdById: req.user.id,
              },
            },
          },
          data: {
            status: "Accepted",
          },
        }),
        prisma.application.updateMany({
          where: {
            userId: {
              notIn: req.body.acceptedUsers,
            },
            jobPostId: {
              equals: req.body.jobPostId,
            },
            jobPost:
            {
              company: {
                createdById: req.user.id,
              },
            },
          },
          data: {
            status: "Rejected",
          },
        }),
        prisma.jobPost.update({
          data: {
            status: "Closed",
          },
          where: {
            id: req.body.jobPostId,
          },
          jobPost:
          {
            company: {
              createdById: req.user.id,
            },
          },
        }),
      ]);
    if (acceptApplicants.count === 0) {
      return res
        .status(404)
        .json({ message: "Accepted applicants were not found" });
    }
    res.status(200).json({ message: "Applications updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getApplicationsByPageAndCount = async (req, res) => {
  const { page, countPerPage } = req.params;
  pageNumber = Number(page);
  countPerPageNumber = Number(countPerPage);
  try {
    const applications = await prisma.application.findMany({
      skip: countPerPageNumber * pageNumber,
      take: countPerPageNumber,
      include: {
        jobPost: true,
        user: true,
        jobPost: {
          include: {
            company: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createApplication,
  applyAsUser,
  getApplication,
  getApplications,
  getOwnApplications,
  updateApplication,
  deleteApplication,
  deleteOwnApplication,
  getApplicationsForJobPost,
  acceptApplicationsForJobPost,
  getApplicationsByPageAndCount,
};
