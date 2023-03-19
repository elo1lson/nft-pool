/**
 * Model for NFT data extracted from blockchain
 * @module Nft
 */

const { DataTypes } = require("sequelize");

const sequelize = require("../../db/connection.js");

/**
 * @typedef {Object} NftAttributes
 * @property {number} id - The unique identifier for the NFT entry
 * @property {string} slug - The slug for the NFT
 * @property {string} address - The address of the NFT
 * @property {string} type - The type of the NFT
 * @property {string} crv - The CRV of the NFT
 * @property {number} sol - The SOL of the NFT
 * @property {number} fees - The fees for the NFT
 * @property {number} nfts - The number of NFTs
 * @property {number} floorPrice - The floor price for the NFT
 * @property {Date} createdAt - The creation date for the NFT entry
 * @property {Date} extractedAt - The date the NFT data was extracted
 */

/**
 * @typedef {import("sequelize").Model<NftAttributes>} NftModel
 */

/**
 * @type {NftModel}
 */
const Nft = sequelize.define("extracted", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  crv: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  sol: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  fees: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  nfts: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  floorPrice: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
  },
  extractedAt: {
    type: DataTypes.DATE,
  },
});

/**
 * @type {NftModel}
 */
module.exports = Nft;
