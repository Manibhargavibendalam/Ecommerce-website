const Order = require("../../models/Order");
const Product = require("../../models/Product");
const ProductReview = require("../../models/Review");

const addProductReview = async (req, res) => {
  try {
    const { productId, userId, userName, reviewMessage, reviewValue } =
      req.body;


      const order=await Order.findOne({
         userId,
         "cartItems.productId":productId
      })

      if(!order){
        return res.status(403).json({
            success:false,
            message:'You need to purchase the product before reviewing it.'
        })
      }

      const  checkExistingReview=await ProductReview.findOne({
        productId,
        userId
      });

      if(checkExistingReview){
        return res.status(400).json({
            success:false,
            message:'You have already reviewed this product.'
        })
      }


    const newReview = new ProductReview({
      productId,
      userId,
      userName,
      reviewMessage,
      reviewValue,
    });

    await newReview.save();

    // Update product's average review score and review count
    const reviews = await ProductReview.find({ productId });
    const totalReviewsLength = reviews.length;
    const averageReview =
      reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) /
      totalReviewsLength;

    await Product.findByIdAndUpdate(productId, {
      averageReview,
    });
    
    return res.status(201).json({   
        success: true,
        data: newReview,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};

const getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;

    const reviews = await ProductReview.find({ productId });

    return res.status(200).json({
      success: true,
      data: reviews,
    });

    
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};

module.exports = { addProductReview, getProductReviews };
