/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateProduct = /* GraphQL */ `
  subscription OnCreateProduct {
    onCreateProduct {
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
export const onUpdateProduct = /* GraphQL */ `
  subscription OnUpdateProduct {
    onUpdateProduct {
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
export const onDeleteProduct = /* GraphQL */ `
  subscription OnDeleteProduct {
    onDeleteProduct {
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
export const onCreateDepartment = /* GraphQL */ `
  subscription OnCreateDepartment {
    onCreateDepartment {
      id
      name
      activityThreshold
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateDepartment = /* GraphQL */ `
  subscription OnUpdateDepartment {
    onUpdateDepartment {
      id
      name
      activityThreshold
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteDepartment = /* GraphQL */ `
  subscription OnDeleteDepartment {
    onDeleteDepartment {
      id
      name
      activityThreshold
      createdAt
      updatedAt
    }
  }
`;
export const onCreateLocation = /* GraphQL */ `
  subscription OnCreateLocation {
    onCreateLocation {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateLocation = /* GraphQL */ `
  subscription OnUpdateLocation {
    onUpdateLocation {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteLocation = /* GraphQL */ `
  subscription OnDeleteLocation {
    onDeleteLocation {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
export const onCreateProductType = /* GraphQL */ `
  subscription OnCreateProductType {
    onCreateProductType {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateProductType = /* GraphQL */ `
  subscription OnUpdateProductType {
    onUpdateProductType {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteProductType = /* GraphQL */ `
  subscription OnDeleteProductType {
    onDeleteProductType {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
export const onCreateLogProduct = /* GraphQL */ `
  subscription OnCreateLogProduct {
    onCreateLogProduct {
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
export const onUpdateLogProduct = /* GraphQL */ `
  subscription OnUpdateLogProduct {
    onUpdateLogProduct {
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
export const onDeleteLogProduct = /* GraphQL */ `
  subscription OnDeleteLogProduct {
    onDeleteLogProduct {
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
export const onCreateOrganization = /* GraphQL */ `
  subscription OnCreateOrganization {
    onCreateOrganization {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateOrganization = /* GraphQL */ `
  subscription OnUpdateOrganization {
    onUpdateOrganization {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteOrganization = /* GraphQL */ `
  subscription OnDeleteOrganization {
    onDeleteOrganization {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
export const onCreatePest = /* GraphQL */ `
  subscription OnCreatePest {
    onCreatePest {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
export const onUpdatePest = /* GraphQL */ `
  subscription OnUpdatePest {
    onUpdatePest {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
export const onDeletePest = /* GraphQL */ `
  subscription OnDeletePest {
    onDeletePest {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
