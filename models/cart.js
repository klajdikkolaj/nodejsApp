const path = require("path");
const fs = require("fs");
const {filters} = require("pug");

const p = path.join(
    path.dirname(require.main.filename),
    'data',
    'cart.json'
);
module.exports = class Cart{
   static addProduct(id, productPrice){
       //fetch the previous cart
       fs.readFile(p, (err,fileContent) =>{
           let cart = {products: [], totalPrice: 0};
           if(!err){
               cart = JSON.parse(fileContent)
           }
       //analyze the cart => find the existing one
       const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
           const existingProduct = cart.products[existingProductIndex];
       let updatedProduct;
           //add new product or increase the quantity
           if(existingProduct){
           updatedProduct = { ...existingProduct };
           updatedProduct.qty = updatedProduct.qty + 1;
           cart.products = [...cart.products];
           cart.products[existingProductIndex] = updatedProduct;
       }else{
           updatedProduct = {id: id, qty: 1};
           cart.products = [...cart.products, updatedProduct];
           }
           cart.totalPrice = cart.totalPrice + +productPrice;
           fs.writeFile(p,JSON.stringify(cart), err1 => {
               console.log(err1);
           })
       })
   }
   static deleteProduct(id, productPrice){
       fs.readFile(p, (err, fileContent) =>{
           if(err){
               return;
           }
           const updatedCart = {...cart};
           const product = updatedCart.products.findIndex(prod => prod.id === id);
           const productQty = product.qty;
           updatedCart.products = updatedCart.products.filter(prod => prod.id !== id)
           updatedCart.totalPrice = cart.totalPrice - productPrice*productQty;
       })

   }

}
