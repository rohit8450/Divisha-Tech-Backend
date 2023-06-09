const mongoose = require('mongoose');

const storeInfoSchema = new mongoose.Schema({
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'seller'
      },
      gst: {
        type: String,
        required: true,
        unique: true
      },
      logo: {
        type: String,
      },
      store_timing: {
        type: String,

      },
},{timestamps: true
});


const Store = mongoose.model("store",storeInfoSchema);

module.exports = Store;