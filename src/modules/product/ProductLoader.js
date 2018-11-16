import ProductModel from './ProductModel'
export const loadAll = async ({ search = '', page, limit}) => {
  let query = {};
  if(search){
    const productNameRegex = new RegExp(search, 'i');
    query = { name: productNameRegex }
  }
  const products = await ProductModel.paginate(query, {
    page,
    limit
  })
  return products;
};

export const loadOne = async ({id}) => {
  const product = await ProductModel.findOne({ _id: id });
  return product;
}

export const loadAddProduct = async ({name, description = '', quantity = 1, value}) => {
  const product = new ProductModel({name, description, quantity, value})
  await product.save();

  return product;
}
