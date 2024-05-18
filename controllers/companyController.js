const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const createCompany = async (req, res) => {
        try {
            const company = await prisma.company.create({
                data: {
                    name: req.body.name,
                    description: req.body.description,
                    createdById: req.user.id,
                }
              });
            res.status(200).json(company);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
}

const addCompany = async (req, res) => {
    try {
        const company = await prisma.company.create({
            data: {
                name: req.body.name,
                description: req.body.description,
                createdById: req.body.createdById,
            }
          });
        res.status(200).json(company);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const getCompanies = async (req, res) => {
    try {
        const companies = await prisma.company.findMany();
        res.status(200).json(companies);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const getCompany = async (req, res) => {
    try {
        const { id } = req.params
        const company = await prisma.company.findUnique({
            where: {
                id: id
            }
        });
        res.status(200).json(company);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const updateCompany = async (req, res) => {
    try {
        const { id } = req.params
        const company = await prisma.company.update({
            data: {
                name: req.body.name,
                description: req.body.description
            },
            where: {
                id: id,
            }
        })

        if (!company) {
            return res.status(404).json({message: "Company not found"})
        }
        const updatedCompany = await prisma.company.findUnique({
            where: {
                id: id,
            }
        });
        res.status(200).json(updatedCompany);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}


const updateOwnCompany = async (req, res) => {
    try {
        const company = await prisma.company.update({
            data: {
                name: req.body.name,
                description: req.body.description
            },
            where: {
                createdById: req.user.id,
            }
        })

        if (!company) {
            return res.status(404).json({message: "Company not found"})
        }
        const updatedCompany = await prisma.company.findUnique({
            where: {
                createdById: req.user.id,
            }
        });
        res.status(200).json(updatedCompany);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const deleteCompany = async (req, res) => {
    try {
        const { id } = req.params
        const company = await prisma.company.delete({
            where: {
                id: id,
            }
        });

        if (!company) {
            return res.status(404).json({message: "Company not found"});
        }

        res.status(200).json({message:"Company deleted successfully"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports = {
    createCompany,
    getCompanies,
    getCompany,
    updateCompany,
    deleteCompany,
    addCompany,
    updateOwnCompany
};
