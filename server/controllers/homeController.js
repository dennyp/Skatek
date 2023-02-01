export class HomeController {
  async index(req, res) {
    res.status(200).send({
      _links: {
        self: { href: `${req.originalUrl}` },
      },
    })
  }
}
