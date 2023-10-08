const mongoose = require('mongoose');
const { resource_model } = require('./datastructure');

/**
 * @typedef Resource
 * @property {Object} resource_data - Additional data related to the resource based on its kind
 * @property {number} [resource_data.medium_cost] - The medium cost of the ingredient (applicable when kind is "product:ingredient")
 * @property {string} [resource_data.currency] - The currency of the medium cost (applicable when kind is "product:ingredient")
 * @property {number} [resource_data.inventory_quantity] - The quantity of the ingredient in inventory (applicable when kind is "product:ingredient")
 * @property {Date} [resource_data.last_restock_date] - The date when the ingredient was last restocked (applicable when kind is "product:ingredient")
 * @property {string} [resource_data.unit_of_measure] - The unit of measure for the ingredient (applicable when kind is "product:ingredient")
 * @property {number} [resource_data.quantity_value] - The quantity value of the ingredient (applicable when kind is "product:ingredient")
 * @property {Array<string>} [resource_data.image_gallery] - Gallery of images for the product (applicable when kind is "product:pdv")
 * @property {number} [resource_data.product_rating] - The rating of the product (applicable when kind is "product:pdv")
 * @property {number} [resource_data.price] - The price of the product (applicable when kind is "product:pdv")
 * @property {Array<string>} [resource_data.product_ingredients] - List of ingredients in the product (applicable when kind is "product:pdv")
 * @property {string} [resource_data.instructions] - Instructions for the recipe (applicable when kind is "knowledge:recipe")
 */
const ResourceSchema = new mongoose.Schema(resource_model);

const Resource = mongoose.model('Resource', ResourceSchema);

module.exports = { Resource };
