function BillingDetails({ bill }) {

return (
<div className="card result">
<h2>Billing Details</h2>

<p><b>Product:</b> {bill.name}</p>
<p><b>Quantity:</b> {bill.quantity}</p>
<p><b>Unit Price:</b> {bill.price}</p>
<h3>Total: ₱{bill.total}</h3>
</div>
);
}

export default BillingDetails;