const mongoose = require('mongoose');
const { project_model } = require('./datastructure');

/**
 * @typedef Project
 * @property {Object} resource_data - Data related to the resources and access management of the project
 * @property {boolean} resource_data.has_org - Whether the project is associated with an organization
 * @property {string} resource_data.org_id - The ID of the associated organization, if any
 * @property {Array<string>} resource_data.apis_enabled - List of enabled APIs for the project
 * @property {Object} resource_data.iam - IAM (Identity and Access Management) data
 * @property {Array<string>} resource_data.iam.read_users - List of user IDs with read access
 * @property {Array<string>} resource_data.iam.write_users - List of user IDs with write access
 * @property {Array<string>} resource_data.resources - List of resource IDs associated with the project
 */
const ProjectSchema = new mongoose.Schema(project_model);

const Project = mongoose.model('Project', ProjectSchema);

module.exports = { Project };
