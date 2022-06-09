/* eslint-disable */
// this is an auto generated file. This will be overwritten

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
      owner
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
        owner
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
        owner
      }
      products {
        nextToken
      }
      createdAt
      updatedAt
      organizationDepartmentsId
      owner
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
        owner
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
        owner
      }
      location {
        id
        name
        createdAt
        updatedAt
        owner
      }
      productType {
        id
        name
        createdAt
        updatedAt
        owner
      }
      placement
      createdAt
      updatedAt
      departmentProductsId
      productLocationId
      productProductTypeId
      owner
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
        owner
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
      owner
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
        owner
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
      owner
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
        owner
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
        owner
      }
      dateLogged
      activity
      gnawed
      newBait
      comment
      createdAt
      updatedAt
      logActivityProductId
      owner
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
        owner
      }
      nextToken
    }
  }
`;
