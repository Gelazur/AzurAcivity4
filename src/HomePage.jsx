import { useEffect } from "react";

function HomePage() {

useEffect(() => {
document.title = "Home";
}, []);

return (
<div>
<h2>Home Page</h2>

<p><b>Conditional Rendering</b> – Display components based on a condition.</p>
<p><b>useEffect</b> – Used to perform side effects like updating document title.</p>
<p><b>Routing</b> – Allows navigation between pages using BrowserRouter, Routes, Route, and Link.</p>
</div>
);
}

export default HomePage;