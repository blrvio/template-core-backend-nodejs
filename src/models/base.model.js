const mongoose = require('mongoose');
const { base_model } = require('./datastructure');

/**
 * @typedef BaseResource
 * @property {string} name - Name of the resource
 * @property {string} description - Description of the resource
 * @property {string} thumbnail_url - Thumbnail URL of the resource
 * @property {string} kind - Kind of resource, one of: 'orgresources:organization', 'orgresources:project', 'orgresources:user', 'product:pdv', 'product:ingredient', 'knowledge:recipe'
 * @property {Object} metadata - Metadata of the resource
 * @property {Date} metadata.created_at - Creation timestamp
 * @property {Date} metadata.last_modified - Last modification timestamp
 * @property {string} metadata.modified_by - ID of the user who last modified the resource
 */
const BaseResourceSchema = new mongoose.Schema(base_model);

// Middleware to set the last modification date on update
BaseResourceSchema.pre('updateOne', function (next) {
  this.set({ 'metadata.last_modified': Date.now() });
  next();
});

// Middleware to set the creation and last modification date on save
BaseResourceSchema.pre('save', function (next) {
  if (this.isNew) {
    this.set({
      'metadata.created_at': Date.now(),
      'metadata.last_modified': Date.now(),
    });
  }
  next();
});

module.exports = mongoose.model('BaseResource', BaseResourceSchema);
