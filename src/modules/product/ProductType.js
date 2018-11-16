import * as ProductLoader from './ProductLoader';
import {
  mapValues
} from 'lodash';
export const typeDefs = `
  type Product {
    id: String,
    name: String,
    description: String,
    quantity: Int,
    value: Float
  },
  type PageInfo {
    pages: Int!,
    page: Int!,
    total: Int!
  }
  type Products {
    products: [Product]
    pageInfo: PageInfo
  }
`;

export const resolvers = {
  getAllProducts: async (_, args, context, info) => {
    const products = await ProductLoader.loadAll(args)
    const result=  {
      products: products.docs,
      pageInfo: {
        pages: products.pages,
        page: products.page,
        total: products.total
      }
    };
    console.log('res', result);
    return result;
  },
  getProductById: async (_, args, context, info) => {
    if(!args.id){
        throw new Error("It's necessary a valid ID.");
    }
    const product = await ProductLoader.loadOne(args)
    return product
  }
};

export const mutations = {
  addProduct: async (_, args, context, info) => {
    const product = await ProductLoader.loadAddProduct(args);
    return product;
  }
}
