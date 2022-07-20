export const listProductsWithExtraInfo = /* GraphQL */ `
  query ListProductsWithExtraInfo(
    $filter: ModelProductFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProducts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        placement
        department {
          id
          name
        }
        productType {
          id
          name
        }
      }
      nextToken
    }
  }
`
