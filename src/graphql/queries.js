/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getProduct = /* GraphQL */ `
  query GetProduct($id: ID!) {
    getProduct(id: $id) {
      id
      name
      department {
        id
        name
        activityThreshold
        createdAt
        updatedAt
      }
      location {
        id
        name
        createdAt
        updatedAt
      }
      productType {
        id
        name
        createdAt
        updatedAt
      }
      placement
      createdAt
      updatedAt
      productDepartmentId
      productLocationId
      productProductTypeId
    }
  }
`;
export const listProducts = /* GraphQL */ `
  query ListProducts(
    $id: ID
    $filter: ModelProductFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listProducts(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        name
        placement
        createdAt
        updatedAt
        productDepartmentId
        productLocationId
        productProductTypeId
      }
      nextToken
    }
  }
`;
export const getDepartment = /* GraphQL */ `
  query GetDepartment($id: ID!) {
    getDepartment(id: $id) {
      id
      name
      activityThreshold
      createdAt
      updatedAt
    }
  }
`;
export const listDepartments = /* GraphQL */ `
  query ListDepartments(
    $id: ID
    $filter: ModelDepartmentFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listDepartments(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        name
        activityThreshold
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getLocation = /* GraphQL */ `
  query GetLocation($id: ID!) {
    getLocation(id: $id) {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
export const listLocations = /* GraphQL */ `
  query ListLocations(
    $id: ID
    $filter: ModelLocationFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listLocations(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        name
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getProductType = /* GraphQL */ `
  query GetProductType($id: ID!) {
    getProductType(id: $id) {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
export const listProductTypes = /* GraphQL */ `
  query ListProductTypes(
    $id: ID
    $filter: ModelProductTypeFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listProductTypes(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        name
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getLogProduct = /* GraphQL */ `
  query GetLogProduct($id: ID!) {
    getLogProduct(id: $id) {
      id
      product {
        id
        name
        placement
        createdAt
        updatedAt
        productDepartmentId
        productLocationId
        productProductTypeId
      }
      dateLogged
      activity
      gnawed
      newBait
      comment
      createdAt
      updatedAt
      logProductProductId
    }
  }
`;
export const listLogProducts = /* GraphQL */ `
  query ListLogProducts(
    $id: ID
    $filter: ModelLogProductFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listLogProducts(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        dateLogged
        activity
        gnawed
        newBait
        comment
        createdAt
        updatedAt
        logProductProductId
      }
      nextToken
    }
  }
`;
export const getOrganization = /* GraphQL */ `
  query GetOrganization($id: ID!) {
    getOrganization(id: $id) {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
export const listOrganizations = /* GraphQL */ `
  query ListOrganizations(
    $id: ID
    $filter: ModelOrganizationFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listOrganizations(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        name
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getPest = /* GraphQL */ `
  query GetPest($id: ID!) {
    getPest(id: $id) {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
export const listPests = /* GraphQL */ `
  query ListPests(
    $id: ID
    $filter: ModelPestFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listPests(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        name
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
