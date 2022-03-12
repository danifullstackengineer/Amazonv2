import Products from "../models/products.js";

const getAllProducts = async (_, res) => {
  try {
    const products = await Products.find({});
    if (products.length === 0) {
      res.send({ found: false, message: "No products were found!" });
    } else {
      res.send({
        found: true,
        message: "Found some products!",
        data: products,
      });
    }
  } catch (err) {
    console.error(err);
  }
};

const insertProduct = async (req, res) => {
  try {
    const body = req.body;
    const newProduct = new Products({
      title: body.title,
      image: body.image,
      price: body.price,
      rating: body.rating,
    });
    newProduct.save();
  } catch (err) {}
};

export { getAllProducts, insertProduct };
