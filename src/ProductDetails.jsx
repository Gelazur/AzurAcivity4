import { useState } from "react";

function ProductDetails({ setBill }) {

const [name, setName] = useState("");
const [quantity, setQuantity] = useState("");
const [price, setPrice] = useState("");

const handleCalculate = () => {
const total = quantity * price;

setBill({
name,
quantity,
price,
total
});
};

const handleReset = () => {
setName("");
setQuantity("");
setPrice("");
setBill(null);
};

return (
<div className="card">
<h2>Product Details</h2>

<input
type="text"
placeholder="Product Name"
value={name}
onChange={(e) => setName(e.target.value)}
/>

<input
type="number"
placeholder="Quantity"
value={quantity}
onChange={(e) => setQuantity(e.target.value)}
/>

<input
type="number"
placeholder="Unit Price"
value={price}
onChange={(e) => setPrice(e.target.value)}
/>

<div className="btn-group">
<button onClick={handleCalculate}>Calculate</button>
<button className="reset" onClick={handleReset}>Reset</button>
</div>
</div>
);
}

export default ProductDetails;
