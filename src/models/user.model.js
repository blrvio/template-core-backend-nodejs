const mongoose = require('mongoose');
const { user_model } = require('./datastructure');

/**
 * @typedef User
 * @property {string} id - Unique identifier for the user
 * @property {Object} resource_data - Additional data related to the user
 * @property {string} resource_data.idp_uuid - IDP UUID of the user
 * @property {string} [resource_data.default_org] - Default organization ID of the user
 * @property {string} resource_data.email - Email address of the user
 * @property {string} [resource_data.phone] - Phone number of the user
 * @property {string} resource_data.account_status - Account status of the user, can be 'active', 'inactive', or 'disabled'
 */
const UserSchema = new mongoose.Schema(user_model);

const User = mongoose.model('User', UserSchema);

module.exports = { User };
