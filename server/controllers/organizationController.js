import axios from 'axios'
import createError from 'http-errors'
import { Organization } from '../models/Organization.js'

export class organizationController {
  async find(req, res, next) {
    try {
      const organizations = await Organization.getAll()
      res.json(organizations)
    } catch (error) {
      next()
    }
  }
}
