const Store = require('../models/storeInfo');
const Category = require('../models/category');
const {Seller}  = require('../models/seller');
const Inventory = require('../models/inventory');
const SubCategory = require('../models/subCategory');

module.exports.createStore = async (req, res) => {

   try {

    const sellerId = req.params.id;
    const { gst, logo, store_timing} = req.body;

    const seller = await Seller.findOne({_id: req.params.id});
    const store = await Store.findOne({gst: req.body.gst});


    if(!seller){
        return res.status(401).json({
            message: "Kindly Add the Seller ID to Create New Store"
        });
    }


    if(store){

        return res.status(401).json({
            message: "GST Number Already Exists"
        });
    }

    const addNewStore = await Store.create({
      seller: sellerId,
      gst,
      logo, 
      store_timing
    });

    addNewStore.seller = sellerId;
    await addNewStore.save();

    return res.json({
        storeAdded: addNewStore,
        message: "New Store Created Successfully!!!"
    });

       
   }catch(error){
    console.log(error);
    res.status(500).send({message: "Internal Server Error"});
   }
    
}

module.exports.createCategory = async (req, res) => {
    try {

        const storeId=req.params.storeId;
        const sellerId=req.params.sellerId;
    
        const{category_name} = req.body;
        const store = await Store.findOne({_id: req.params.storeId});
        const seller = await Seller.findOne({_id: sellerId});
        // console.log(seller);
    
        if(!store){
            return res.status(401).json({
                message: "Kindly Add the Store ID to Create New Category"
            });
        }
    
    
        const addNewCategory = await Category.create({
          storeInfo: storeId,
          category_name,
          subCategory:[]
        });

        seller.category.push(addNewCategory._id);

        await seller.save();
    
        return res.json({
            categoryAdded: addNewCategory,
            message: "New Category Created Successfully!!!"
        });
    
           
       }catch(error){
        console.log(error);
        res.status(500).send({message: "Internal Server Error"});
       }
}

module.exports.createSubCategory = async (req, res) => {
    
    try {

        const categoryId = req.params.categoryId;
        const sellerId = req.params.sellerId;

        const {subcategory_name} = req.body;
        

        const category = await Category.findOne({_id: categoryId});
        const seller = await Seller.findOne({_id: sellerId});

        if(!category){
            return res.status(401).json({
                message: "Kindly Add the Category ID to Create New Sub Category"
            });
        }
    
    
        const addNewSubCategory = await SubCategory.create({
          category: categoryId,
          subcategory_name: subcategory_name,
          inventory: []
        });

        seller.subCategory.push(addNewSubCategory._id);
        category.subCategory.push(addNewSubCategory._id);

        await seller.save();
        await category.save()

    
        return res.json({
            subCategoryAdded: addNewSubCategory,
            message: "New Sub-Category Created Successfully!!!"
        });
    
           
       }catch(error){
        console.log(error);
        res.status(500).send({message: "Internal Server Error"});
       }
}

module.exports.createInventory = async (req,res)=> {

    const categoryId = req.params.categoryId;
    const subCategoryId = req.params.subCategoryId;

    const {product_name, MRP, selling_price, quantity, product_images} = req.body;

    try {

        const category = await Category.findOne({_id: categoryId});
        const subCategory = await SubCategory.findOne({_id: subCategoryId});
    
        if(!category){
            return res.status(401).json({
                message: "Kindly Add the Category ID to Create New Inventory"
            });
        }
    
        if(!subCategory){
            return res.status(401).json({
                message: "Kindly Add the Category ID to Create New Inventory"
            });
        }
    
        const addNewInventory = await Inventory.create({
          category: categoryId,
          subCategory: subCategoryId,
          product_name,
          MRP,
          selling_price,
          quantity,
          product_images,


        });

        subCategory.inventory.push(addNewInventory._id);
        await subCategory.save();
    
        return res.json({
            inventoryAdded: addNewInventory,
            message: "New Inventroy Added Successfully!!!"
        });
    
           
       }catch(error){
        console.log(error);
        res.status(500).send({message: "Internal Server Error"});
       }
}


