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
          # location {
          #   id
          #   name
          # }
          productType {
            id
            name
          }
        }
      }
    }
  }
`

export const getActivityLogWithExtraInfo = /* GraphQL */ `
  query GetActivityLogWithExtraInfo($id: ID!) {
    getActivityLog(id: $id) {
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
  }
`

export const updateActivityLogWithExtraInfo = /* GraphQL */ `
  mutation UpdateActivityLogWithExtraInfo(
    $input: UpdateActivityLogInput!
    $condition: ModelActivityLogConditionInput
  ) {
    updateActivityLog(input: $input, condition: $condition) {
      id
      product {
        id
        name
        placement
        department {
          id
          name
        }
      }
      dateLogged
      activity
      comment
      createdAt
      updatedAt
      activityLogProductId
    }
  }
`

export const createActivityLogWithExtraInfo = /* GraphQL */ `
  mutation CreateActivityLogWithExtraInfo(
    $input: CreateActivityLogInput!
    $condition: ModelActivityLogConditionInput
  ) {
    createActivityLog(input: $input, condition: $condition) {
      id
      product {
        id
        name
        placement
        department {
          id
          name
        }
        productLocationId
        productProductTypeId
      }
      dateLogged
      activity
      comment
      createdAt
      updatedAt
      activityLogProductId
    }
  }
`
