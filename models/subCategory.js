const mongoose = require('mongoose');

const subCategorySchema = new mongoose.Schema({

  category: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Category' 
  } ,
    subcategory_name: {
        type: String
    }, 
    
    inventory: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Inventory' 
      }] 

    
});

const SubCategory = mongoose.model("sub-category", subCategorySchema);
module.exports = SubCategory;