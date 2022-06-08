/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createOrganization = /* GraphQL */ `
  mutation CreateOrganization(
    $input: CreateOrganizationInput!
    $condition: ModelOrganizationConditionInput
  ) {
    createOrganization(input: $input, condition: $condition) {
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
export const updateOrganization = /* GraphQL */ `
  mutation UpdateOrganization(
    $input: UpdateOrganizationInput!
    $condition: ModelOrganizationConditionInput
  ) {
    updateOrganization(input: $input, condition: $condition) {
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
export const deleteOrganization = /* GraphQL */ `
  mutation DeleteOrganization(
    $input: DeleteOrganizationInput!
    $condition: ModelOrganizationConditionInput
  ) {
    deleteOrganization(input: $input, condition: $condition) {
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
export const createDepartment = /* GraphQL */ `
  mutation CreateDepartment(
    $input: CreateDepartmentInput!
    $condition: ModelDepartmentConditionInput
  ) {
    createDepartment(input: $input, condition: $condition) {
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
export const updateDepartment = /* GraphQL */ `
  mutation UpdateDepartment(
    $input: UpdateDepartmentInput!
    $condition: ModelDepartmentConditionInput
  ) {
    updateDepartment(input: $input, condition: $condition) {
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
export const deleteDepartment = /* GraphQL */ `
  mutation DeleteDepartment(
    $input: DeleteDepartmentInput!
    $condition: ModelDepartmentConditionInput
  ) {
    deleteDepartment(input: $input, condition: $condition) {
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
export const createLogActivity = /* GraphQL */ `
  mutation CreateLogActivity(
    $input: CreateLogActivityInput!
    $condition: ModelLogActivityConditionInput
  ) {
    createLogActivity(input: $input, condition: $condition) {
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
export const updateLogActivity = /* GraphQL */ `
  mutation UpdateLogActivity(
    $input: UpdateLogActivityInput!
    $condition: ModelLogActivityConditionInput
  ) {
    updateLogActivity(input: $input, condition: $condition) {
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
export const deleteLogActivity = /* GraphQL */ `
  mutation DeleteLogActivity(
    $input: DeleteLogActivityInput!
    $condition: ModelLogActivityConditionInput
  ) {
    deleteLogActivity(input: $input, condition: $condition) {
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
