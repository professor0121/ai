import projectModel from '../models/project.model.js';

export const createProject = async ({ name, userId }) => {
    if (!name || !userId) {
        throw new Error("Name and user ID are required");
    }

    // Check if the project name already exists before creating a new project
    const existingProject = await projectModel.findOne({ name });
    if (existingProject) {
        throw new Error(`Project name ${name} already exists`);
    }

    let project;
    try {
        project = await projectModel.create({
            name,
            users: [userId]
        });
    } catch (error) {
        if (error.code === 11000) {
            // Handles any unexpected duplicate key errors
            throw new Error("Project name already exists");
        }
        throw error;  // Re-throw other errors
    }

    return project;
};
