const mongoose = require('mongoose');
const { organization_model } = require('./datastructure');

/**
 * @typedef Organization
 * @property {string} id - Unique identifier for the organization
 * @property {Object} resource_data - Data related to the resources and access management of the organization
 * @property {Object} resource_data.iam - IAM (Identity and Access Management) data
 * @property {Array<string>} [resource_data.iam.read_users] - List of user IDs with read access
 * @property {Array<string>} [resource_data.iam.write_users] - List of user IDs with write access
 * @property {Array<string>} [resource_data.resources] - List of resource IDs associated with the organization
 */
const OrganizationSchema = new mongoose.Schema(organization_model);

const Organization = mongoose.model('Organization', OrganizationSchema);

module.exports = { Organization };
