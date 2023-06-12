const mongoose = require('mongoose');

const subCategorySchema = new mongoose.Schema({

  category: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'category' 
  } ,
    subcategory_name: {
        type: String
    }, 
    
    inventory: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'inventory' 
      }] 

    
});

const SubCategory = mongoose.model("subCategory", subCategorySchema);
module.exports = SubCategory;