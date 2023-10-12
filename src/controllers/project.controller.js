const { FastifyRequest, FastifyReply } = require('fastify');
const { Project } = require('../models/project.model');
const {
  connectDb,
  disconnectDb,
} = require('../services/database/common.database');
const { checkUUIDFromToken } = require('../services/database/plugins.database');

// Controller for creating a new project
async function createProject(request, reply) {
  try {
    const user_uuid = await checkUUIDFromToken(request.user);
    const projectData = {
      ...request.body,
      resource_data: {
        ...request.body.resource_data,
        iam: {
          owner_user: user_uuid,
        },
      },
      kind: 'orgresources:project',
    };
    await connectDb();
    const newProject = new Project(projectData);
    await newProject.save();
    reply.code(201).send(newProject);
  } catch (error) {
    reply.code(500).send({ error: error.message });
  } finally {
    await disconnectDb();
  }
}

// Controller for reading data about a specific project
async function readProject(request, reply) {
  try {
    const user_uuid = await checkUUIDFromToken(request.user);
    const projectId = request.params.id;
    await connectDb();
    const project = await Project.findOne({
      id: projectId,
      $or: [
        { 'resource_data.iam.read_users': user_uuid },
        { 'resource_data.iam.write_users': user_uuid },
        { 'resource_data.iam.owner_user': user_uuid },
      ],
    }).exec();
    if (project) {
      reply.code(200).send(project);
    } else {
      reply.code(403).send({ error: 'Forbidden' });
    }
  } catch (error) {
    reply.code(500).send({ error: error.message });
  } finally {
    await disconnectDb();
  }
}

// Controller for reading data about all projects of a specific user
async function readAllProjects(request, reply) {
  try {
    const user_uuid = await checkUUIDFromToken(request.user);
    await connectDb();
    const projects = await Project.find({
      $or: [
        { 'resource_data.iam.read_users': user_uuid },
        { 'resource_data.iam.write_users': user_uuid },
        { 'resource_data.iam.owner_user': user_uuid },
      ],
    }).exec();
    if (projects) {
      reply.code(200).send(projects);
    } else {
      reply.code(404).send({ error: 'Projects not found' });
    }
  } catch (error) {
    reply.code(500).send({ error: error.message });
  } finally {
    await disconnectDb();
  }
}

// Controller for updating a specific project
async function updateProject(request, reply) {
  try {
    const user_uuid = await checkUUIDFromToken(request.user);
    const projectId = request.params.id;
    const updateData = request.body;
    await connectDb();
    const project = await Project.findOneAndUpdate(
      {
        id: projectId,
        $or: [
          { 'resource_data.iam.write_users': user_uuid },
          { 'resource_data.iam.owner_user': user_uuid },
        ],
      },
      updateData,
      { new: true }
    ).exec();
    if (project) {
      reply.code(200).send(project);
    } else {
      reply.code(403).send({ error: 'Forbidden' });
    }
  } catch (error) {
    reply.code(500).send({ error: error.message });
  } finally {
    await disconnectDb();
  }
}

// Controller for deleting a specific project
async function deleteProject(request, reply) {
  try {
    const user_uuid = await checkUUIDFromToken(request.user);
    const projectId = request.params.id;
    await connectDb();
    const project = await Project.findOneAndDelete({
      id: projectId,
      'resource_data.iam.owner_user': user_uuid,
    }).exec();
    if (project) {
      reply.code(200).send({ message: 'Project deleted successfully' });
    } else {
      reply.code(403).send({ error: 'Forbidden' });
    }
  } catch (error) {
    reply.code(500).send({ error: error.message });
  } finally {
    await disconnectDb();
  }
}

module.exports = {
  createProject,
  readProject,
  updateProject,
  deleteProject,
  readAllProjects,
};
