// import mongoose from "mongoose";

// const ListingSchema = new mongoose.Schema(
//     {
//         name:{
//             type:String,
//             required : true,
//         },
//         description:{
//             type: String,
//             required : true,
//         },

//         address:{
//             type:String,
//             required:true

//         },
//         price:{
//             type:Number,
//             required: true,
//         },
//         regularPrice:{
//             type:Number,
//             required:true

//         },
//         discountPrice:{
//             type:Number,
//             required:true
//         },
//         bathrooms:{
//             type:Number,
//             required:true
//         },
//         bedrooms:{
//             type:Number,
//              required:true

//         },
//         furnished:{
//             type:Boolean,
//              required:true
//         },
//         parking:{
//             type:Boolean,
//              required:true
//         },
//         type:{
//             type:String,
//              required:true
//         },
//         offer:{
//             type:String,
//              required:true
            
//         },
//         imageUrls:{
//             type:Array,
//             required:true
//         },
//         userRef:{
//             type:String,
//              required:true
//         },

//     },{timestamps:true}
// );

// const Listing = mongoose.model('Listing', ListingSchema);
// export default Listing;

//AI Wala Code

import mongoose from "mongoose";

const ListingSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required : true,
        },
        description:{
            type: String,
            required : true,
        },
        address:{                          // ✅ fixed spelling
            type:String,
            required:true
        },
        regularPrice:{
            type:Number,
            required:true
        },
        discountPrice:{
            type:Number,
            required:true
        },
        bathrooms:{
            type:Number,
            required:true
        },
        bedrooms:{
            type:Number,
            required:true
        },
        furnished:{
            type:Boolean,
            required:true
        },
        parking:{
            type:Boolean,
            required:true
        },
        type:{
            type:String,
            required:true
        },
        offer:{
            type:Boolean,               // ✅ fixed type
            required:true
        },
        imageUrls:{
            type:Array,
            required:true
        },
        userRef:{
            type:String,
            required:true
        },
        latitude:{
            type:Number,
            required:false
        },
        longitude:{
            type:Number,
            required:false
        },
    },{timestamps:true}
);

const Listing = mongoose.model('Listing', ListingSchema);
export default Listing;