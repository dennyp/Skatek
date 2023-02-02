import { Location } from '../models/Location.js'

export class locationController {
  async findAll(req, res, next) {
    try {
      const locations = await Location.getAll()
      res.json(locations)
    } catch (error) {
      next()
    }
  }
}
