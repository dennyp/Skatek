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
      productProductTypeId
    }
  }
`;
export const onCreateDepartment = /* GraphQL */ `
  subscription OnCreateDepartment {
    onCreateDepartment {
      id
      name
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
