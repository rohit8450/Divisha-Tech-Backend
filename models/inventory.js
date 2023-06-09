const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
    product_name: {
        type: String,
        required: true
    }, 
    MRP: { 
      type:Number, 
      required:true
    } ,
    selling_price: { 
        type: Number, 
        required: true
      } ,
      quantity: { 
        type: Number, 
        required: true
      },
      product_images: { 
        type: String 
        
      },
      category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category'
    },
    subCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subCategory'
    }
},{
    timestamps: true
});

const Inventory = mongoose.model("inventory", inventorySchema);
module.exports = Inventory;