/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getOrganization = /* GraphQL */ `
  query GetOrganization($id: ID!) {
    getOrganization(id: $id) {
      id
      name
      departments {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listOrganizations = /* GraphQL */ `
  query ListOrganizations(
    $filter: ModelOrganizationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOrganizations(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
export const getDepartment = /* GraphQL */ `
  query GetDepartment($id: ID!) {
    getDepartment(id: $id) {
      id
      name
      activityThreshold
      organization {
        id
        name
        createdAt
        updatedAt
      }
      products {
        nextToken
      }
      createdAt
      updatedAt
      organizationDepartmentsId
    }
  }
`;
export const listDepartments = /* GraphQL */ `
  query ListDepartments(
    $filter: ModelDepartmentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDepartments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        activityThreshold
        createdAt
        updatedAt
        organizationDepartmentsId
      }
      nextToken
    }
  }
`;
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
        organizationDepartmentsId
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
      departmentProductsId
      productLocationId
      productProductTypeId
    }
  }
`;
export const listProducts = /* GraphQL */ `
  query ListProducts(
    $filter: ModelProductFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProducts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        placement
        createdAt
        updatedAt
        departmentProductsId
        productLocationId
        productProductTypeId
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
    $filter: ModelLocationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLocations(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
    $filter: ModelProductTypeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProductTypes(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
export const getLogActivity = /* GraphQL */ `
  query GetLogActivity($id: ID!) {
    getLogActivity(id: $id) {
      id
      product {
        id
        name
        placement
        createdAt
        updatedAt
        departmentProductsId
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
      logActivityProductId
    }
  }
`;
export const listLogActivities = /* GraphQL */ `
  query ListLogActivities(
    $filter: ModelLogActivityFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLogActivities(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        dateLogged
        activity
        gnawed
        newBait
        comment
        createdAt
        updatedAt
        logActivityProductId
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
    $filter: ModelPestFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPests(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
