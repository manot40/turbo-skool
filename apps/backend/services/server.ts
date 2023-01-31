// Dependencies
import dataSource from 'entities/data-source';
import fastify, { type FastifyInstance } from 'fastify';

// Helpers and Utilities

// Middleware

export default class Server {
  private app: FastifyInstance;

  constructor() {
    this.app = fastify();
    this.initialize();
  }

  private async initialize() {
    await dataSource.initialize();

    // Middlewares

    // Routes
  }
}
