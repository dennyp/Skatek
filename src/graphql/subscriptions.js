/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateOrganization = /* GraphQL */ `
  subscription OnCreateOrganization($owner: String) {
    onCreateOrganization(owner: $owner) {
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
export const onUpdateOrganization = /* GraphQL */ `
  subscription OnUpdateOrganization($owner: String) {
    onUpdateOrganization(owner: $owner) {
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
export const onDeleteOrganization = /* GraphQL */ `
  subscription OnDeleteOrganization($owner: String) {
    onDeleteOrganization(owner: $owner) {
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
export const onCreateDepartment = /* GraphQL */ `
  subscription OnCreateDepartment($owner: String) {
    onCreateDepartment(owner: $owner) {
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
export const onUpdateDepartment = /* GraphQL */ `
  subscription OnUpdateDepartment($owner: String) {
    onUpdateDepartment(owner: $owner) {
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
export const onDeleteDepartment = /* GraphQL */ `
  subscription OnDeleteDepartment($owner: String) {
    onDeleteDepartment(owner: $owner) {
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
export const onCreateProduct = /* GraphQL */ `
  subscription OnCreateProduct($owner: String) {
    onCreateProduct(owner: $owner) {
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
export const onUpdateProduct = /* GraphQL */ `
  subscription OnUpdateProduct($owner: String) {
    onUpdateProduct(owner: $owner) {
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
export const onDeleteProduct = /* GraphQL */ `
  subscription OnDeleteProduct($owner: String) {
    onDeleteProduct(owner: $owner) {
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
export const onCreateLocation = /* GraphQL */ `
  subscription OnCreateLocation($owner: String) {
    onCreateLocation(owner: $owner) {
      id
      name
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateLocation = /* GraphQL */ `
  subscription OnUpdateLocation($owner: String) {
    onUpdateLocation(owner: $owner) {
      id
      name
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteLocation = /* GraphQL */ `
  subscription OnDeleteLocation($owner: String) {
    onDeleteLocation(owner: $owner) {
      id
      name
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onCreateProductType = /* GraphQL */ `
  subscription OnCreateProductType($owner: String) {
    onCreateProductType(owner: $owner) {
      id
      name
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateProductType = /* GraphQL */ `
  subscription OnUpdateProductType($owner: String) {
    onUpdateProductType(owner: $owner) {
      id
      name
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteProductType = /* GraphQL */ `
  subscription OnDeleteProductType($owner: String) {
    onDeleteProductType(owner: $owner) {
      id
      name
      createdAt
      updatedAt
      owner
    }
  }
`;
