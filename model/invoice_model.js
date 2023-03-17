const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;


const InvoiceSchema = new Schema( {
	order_number : {
                type : Number,
                required: true,
                unique: true,
                min: 100001,
                max: 999999           
        },
        company_name : {
                type: String
        },
        products : [
                {
                        item : String,
                        descreption: String,
                        quantity: Number,
                        price: Number
                }
        ],
        subtotal : Number,
        convienance_fee : Number,
        total : Number,
        payment_status: Boolean,
        payemt_history: {
                payment_id: String,
                
        },
        date:{
                billing_Date : String,
                due_Date : String
        },
        text : String
        
} );


module.exports = InvoiceModel= mongoose.model( 'invoice', InvoiceSchema );