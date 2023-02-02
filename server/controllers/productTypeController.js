import { ProductType } from '../models/ProductType.js'

export class productTypeController {
  async findAll(req, res, next) {
    try {
      const productTypes = await ProductType.getAll()
      res.json(productTypes)
    } catch (error) {
      next()
    }
  }

  async create(req, res, next) {
    try {
      const productTypeObj = new ProductType({
        name: req.body.name,
      })

      await productTypeObj.save()

      const newProductTypeURL = `https://${req.get('host')}${req.originalUrl}/${
        productTypeObj._id
      }`
      res.location(newProductTypeURL).status(201).json(productTypeObj)
    } catch (error) {
      next()
    }
  }
}
