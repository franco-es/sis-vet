// const mongoose = require('mongoose');

// const Schema = mongoose.Schema;

// var SaleSchema = Schema({
//     date: Date,
//     totalAmaunt: Number,
//     products: [{
//         product: { type: Schema.Types.ObjectId, ref: 'Producto' },
//         quantity: Number,
//         totalPerProduc: Number
//     }],
//     // productList: {type: Schema.ObjectId, ref: "ProductList"},
//     saleNumber: Number,
//     paymentType: String,
// })

// SaleSchema.pre("save", function(next){
//     var total = 0;
//     this.products.array.forEach(obj => {
//         total += obj.quantity * obj.product.precVenta;
//     });
//     this.totalAmaunt = total;

//     next();

// })

// const Sale = mongoose.model("Sale", SaleSchema);

// module.exports = {Sale};