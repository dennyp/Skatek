/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createProduct = /* GraphQL */ `
  mutation CreateProduct(
    $input: CreateProductInput!
    $condition: ModelProductConditionInput
  ) {
    createProduct(input: $input, condition: $condition) {
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
export const updateProduct = /* GraphQL */ `
  mutation UpdateProduct(
    $input: UpdateProductInput!
    $condition: ModelProductConditionInput
  ) {
    updateProduct(input: $input, condition: $condition) {
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
export const deleteProduct = /* GraphQL */ `
  mutation DeleteProduct(
    $input: DeleteProductInput!
    $condition: ModelProductConditionInput
  ) {
    deleteProduct(input: $input, condition: $condition) {
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
export const createDepartment = /* GraphQL */ `
  mutation CreateDepartment(
    $input: CreateDepartmentInput!
    $condition: ModelDepartmentConditionInput
  ) {
    createDepartment(input: $input, condition: $condition) {
      id
      name
      activityThreshold
      createdAt
      updatedAt
    }
  }
`;
export const updateDepartment = /* GraphQL */ `
  mutation UpdateDepartment(
    $input: UpdateDepartmentInput!
    $condition: ModelDepartmentConditionInput
  ) {
    updateDepartment(input: $input, condition: $condition) {
      id
      name
      activityThreshold
      createdAt
      updatedAt
    }
  }
`;
export const deleteDepartment = /* GraphQL */ `
  mutation DeleteDepartment(
    $input: DeleteDepartmentInput!
    $condition: ModelDepartmentConditionInput
  ) {
    deleteDepartment(input: $input, condition: $condition) {
      id
      name
      activityThreshold
      createdAt
      updatedAt
    }
  }
`;
export const createLocation = /* GraphQL */ `
  mutation CreateLocation(
    $input: CreateLocationInput!
    $condition: ModelLocationConditionInput
  ) {
    createLocation(input: $input, condition: $condition) {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
export const updateLocation = /* GraphQL */ `
  mutation UpdateLocation(
    $input: UpdateLocationInput!
    $condition: ModelLocationConditionInput
  ) {
    updateLocation(input: $input, condition: $condition) {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
export const deleteLocation = /* GraphQL */ `
  mutation DeleteLocation(
    $input: DeleteLocationInput!
    $condition: ModelLocationConditionInput
  ) {
    deleteLocation(input: $input, condition: $condition) {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
export const createProductType = /* GraphQL */ `
  mutation CreateProductType(
    $input: CreateProductTypeInput!
    $condition: ModelProductTypeConditionInput
  ) {
    createProductType(input: $input, condition: $condition) {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
export const updateProductType = /* GraphQL */ `
  mutation UpdateProductType(
    $input: UpdateProductTypeInput!
    $condition: ModelProductTypeConditionInput
  ) {
    updateProductType(input: $input, condition: $condition) {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
export const deleteProductType = /* GraphQL */ `
  mutation DeleteProductType(
    $input: DeleteProductTypeInput!
    $condition: ModelProductTypeConditionInput
  ) {
    deleteProductType(input: $input, condition: $condition) {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
export const createLogProduct = /* GraphQL */ `
  mutation CreateLogProduct(
    $input: CreateLogProductInput!
    $condition: ModelLogProductConditionInput
  ) {
    createLogProduct(input: $input, condition: $condition) {
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
export const updateLogProduct = /* GraphQL */ `
  mutation UpdateLogProduct(
    $input: UpdateLogProductInput!
    $condition: ModelLogProductConditionInput
  ) {
    updateLogProduct(input: $input, condition: $condition) {
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
export const deleteLogProduct = /* GraphQL */ `
  mutation DeleteLogProduct(
    $input: DeleteLogProductInput!
    $condition: ModelLogProductConditionInput
  ) {
    deleteLogProduct(input: $input, condition: $condition) {
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
export const createOrganization = /* GraphQL */ `
  mutation CreateOrganization(
    $input: CreateOrganizationInput!
    $condition: ModelOrganizationConditionInput
  ) {
    createOrganization(input: $input, condition: $condition) {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
export const updateOrganization = /* GraphQL */ `
  mutation UpdateOrganization(
    $input: UpdateOrganizationInput!
    $condition: ModelOrganizationConditionInput
  ) {
    updateOrganization(input: $input, condition: $condition) {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
export const deleteOrganization = /* GraphQL */ `
  mutation DeleteOrganization(
    $input: DeleteOrganizationInput!
    $condition: ModelOrganizationConditionInput
  ) {
    deleteOrganization(input: $input, condition: $condition) {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
export const createPest = /* GraphQL */ `
  mutation CreatePest(
    $input: CreatePestInput!
    $condition: ModelPestConditionInput
  ) {
    createPest(input: $input, condition: $condition) {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
export const updatePest = /* GraphQL */ `
  mutation UpdatePest(
    $input: UpdatePestInput!
    $condition: ModelPestConditionInput
  ) {
    updatePest(input: $input, condition: $condition) {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
export const deletePest = /* GraphQL */ `
  mutation DeletePest(
    $input: DeletePestInput!
    $condition: ModelPestConditionInput
  ) {
    deletePest(input: $input, condition: $condition) {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
