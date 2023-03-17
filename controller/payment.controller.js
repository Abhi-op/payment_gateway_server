
 const HttpStatus = require('http-status');
 const Invoice = require("../model/invoice_model")
const Insta = require('instamojo-nodejs');
const url = require('url');
const httpStatus = require('http-status');


exports.pay = ( req, res ) => {
	Insta.setKeys(process.env.API_KEY, process.env.AUTH_KEY);

	const data = new Insta.PaymentData();
	Insta.isSandboxMode(true);

	data.purpose =  req.body.purpose;
	data.amount = req.body.amount;
	data.redirect_url =  req.body.redirect_url; 
	data.send_email =  false;
	data.send_sms = false;
	data.allow_repeated_payments =  false;

	Insta.createPayment(data, function(error, response) {
		if (error) {
			// some error
			console.log(error);
		} else {
			// Payment redirection link at response.payment_request.longurl
			const responseData = JSON.parse( response );
			const redirectUrl = responseData.payment_request.longurl;
			console.log( redirectUrl );

			res.status( 200 ).json( redirectUrl );
		}
	});
}


exports.getAllInvoice =  async(req,res) =>{
	try{
	  const invoiceData =   await Invoice.find({});
	  console.log(invoiceData);
	  res.status(HttpStatus.OK).send(invoiceData);
	    
	}catch(err){
		console.log("Error While fetching Invoices",err);
		res.status(HttpStatus.BAD_REQUEST).send({status:false,message: err.message });
	}
}
/**
 * @route GET 
 * @desc Call back url for instamojo
 * @access public
 */
exports.paymentDetails = (req,res) =>{
	try {
		let url_parts = url?.parse( req?.url, true),
		responseData = url_parts.query;

	if ( responseData.payment_id ) {
		let order_number = responseData.order_number;
		Invoice.findOneAndUpdate({ "order_number" : order_number}, 
		{ "$set" : { "payment_status" : true , "payemt_history":{"payment_id":responseData?.payment_id} } }, 
		{ "upsert" : true } )
		.then( ( UpdatedInvoice ) => res.json(UpdatedInvoice))
		.catch( ( errors ) => console.log(errors) );

		// Redirect the user to payment complete page.
		return res.redirect(`REDIRECT_URL/${order_number}`);
	}
		
	} catch (error) {
		console.log(error);
		res.status(HttpStatus.BAD_REQUEST).send({status:false,message: err.message });
	}
	
}
