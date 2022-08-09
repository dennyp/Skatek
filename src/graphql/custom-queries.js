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

export const listActivityLogsWithExtraInfo = /* GraphQL */ `
  query ListActivityLogsWithExtraInfo(
    $filter: ModelActivityLogFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listActivityLogs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        activity
        comment
        dateLogged
        product {
          id
          name
          placement
          department {
            id
            name
          }
        }
      }
      nextToken
    }
  }
`
