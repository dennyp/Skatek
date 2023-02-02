import axios from 'axios'
import createError from 'http-errors'
import { Department } from '../models/Department.js'

export class departmentController {
  async find(req, res, next) {
    try {
      const id = req.params.id
      const departmentObj = await Department.getById(id)

      if (!departmentObj || typeof departmentObj === undefined) {
        next(createError(404))
        return
      }

      res.json(departmentObj)
    } catch (error) {
      next(createError(404))
    }
  }

  async findAll(req, res, next) {
    try {
      const departments = await Department.getAll()
      res.json(departments)
    } catch (error) {
      next()
    }
  }

  async create(req, res, next) {
    try {
      const departmentObj = new Department({
        activityThreshold: req.body.activityThreshold,
        name: req.body.name,
        organization: req.body.organization,
      })

      await departmentObj.save()

      const newDepartmentURL = `https://${req.get('host')}${req.originalUrl}/${
        departmentObj._id
      }`
      res.location(newDepartmentURL).status(201).json(departmentObj)
    } catch (error) {
      next()
    }
  }
}
