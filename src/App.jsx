import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import HomePage from "./HomePage";
import PriceChecker from "./PriceChecker";
import ApiPractice from "./ApiPractice";

function Layout() {
return (
<div className="container">
<h1>React App</h1>

<nav>
<Link to="/">Home</Link>
<Link to="/price-checker">Price Checker</Link>
<Link to="/api-practice">API Practice</Link>
</nav>

<hr />
<Outlet />
</div>
);
}

function App() {
return (
<BrowserRouter>
<Toaster position="top-right" />
<Routes>
<Route path="/" element={<Layout />}>
<Route index element={<HomePage />} />
<Route path="price-checker" element={<PriceChecker />} />
<Route path="api-practice" element={<ApiPractice />} />
</Route>
</Routes>
</BrowserRouter>
);
}

export default App;