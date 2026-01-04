
const Order=require("../../models/Order");

const getAllOrdersOfAllUsers = async (req, res) => {
  try {
    const orders = await Order.find().sort({ orderDate: -1 });

    if(!orders || orders.length===0){
      return res.status(200).json({
        success: true,
        data: [],
      });
    }

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred!",
    });
  }
};

const getOrderDetailsForAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("order id", id);
    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found!",
      });
    }
    console.log("order details", order);

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred!",
    });
  }
};


const updateOrderStatus=async(req,res)=>{
  try{
    const {id}=req.params;
    const {orderStatus}=req.body;

    const order=await Order.findById(id);

    if(!order){
      return res.status(404).json({
        success:false,
        message:"Order not found!"
      }); 
    }

    await Order.findByIdAndUpdate(id, { orderStatus });

    res.status(200).json({
      success:true,
      message:"Order status updated successfully",
    })

  }catch(e){
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred!",
    });
  }
}


module.exports = {
  getAllOrdersOfAllUsers,
  getOrderDetailsForAdmin,
  updateOrderStatus,
};



