import { useState, useEffect } from "react";
import ProductDetails from "./ProductDetails";
import BillingDetails from "./BillingDetails";

function PriceChecker() {

const [bill, setBill] = useState(null);

useEffect(() => {
document.title = "Price Checker";
}, []);

return (
<div>
<ProductDetails setBill={setBill} />

{/* Conditional Rendering */}
{bill && <BillingDetails bill={bill} />}
</div>
);
}

export default PriceChecker;
