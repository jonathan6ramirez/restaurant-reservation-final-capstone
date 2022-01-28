/**
 * Knex configuration file.
 *
 * You will not need to make changes to this file.
 */

require('dotenv').config();
const path = require("path");

const {
  DATABASE_URL = "postgres://mwdydrhu:dcxtXNoiPrnwS7Go9diNqYziExFmM4Cg@isilo.db.elephantsql.com/mwdydrhu",
  DATABASE_URL_DEVELOPMENT = "postgres://qacobgur:6txZUG6AuKFCqcHE6fb1QbjMlp2NetCQ@isilo.db.elephantsql.com/qacobgur",
  DATABASE_URL_TEST = "postgres://rmcifodq:UZbimkH30REjTwCqujfRX3lVhs1MJW5d@isilo.db.elephantsql.com/rmcifodq",
  DATABASE_URL_PREVIEW = "postgres://mgngzqrd:UsJxNsadTafL7ZVzOHkgKLPeCYhPcs92@isilo.db.elephantsql.com/mgngzqrd",
  DEBUG,
} = process.env;

module.exports = {
  development: {
    client: "postgresql",
    pool: { min: 1, max: 5 },
    connection: DATABASE_URL_DEVELOPMENT,
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    debug: !!DEBUG,
  },
  test: {
    client: "postgresql",
    pool: { min: 1, max: 5 },
    connection: DATABASE_URL_TEST,
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    debug: !!DEBUG,
  },
  preview: {
    client: "postgresql",
    pool: { min: 1, max: 5 },
    connection: DATABASE_URL_PREVIEW,
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    debug: !!DEBUG,
  },
  production: {
    client: "postgresql",
    pool: { min: 1, max: 5 },
    connection: DATABASE_URL,
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    debug: !!DEBUG,
  },
};
