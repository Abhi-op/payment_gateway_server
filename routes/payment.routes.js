const express= require('express');

const router= express.Router();

const PaymentController = require('../controller/payment.controller');

router.post("/:order_number/pay",PaymentController.pay);
  
router.get("/getAll",PaymentController.getAllInvoice);
 
router.get("/payment/verify",PaymentController.paymentDetails)

router.post("/addData", PaymentController.addData);


module.exports = router