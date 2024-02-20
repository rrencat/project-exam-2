import { useState } from "react";
import { Input } from "react-daisyui";
import { Link } from "react-router-dom";

function ProductFilter({ products = [] }) {
	const [searchTerm, setSearchTerm] = useState("");

	console.log("ss", searchTerm);

	// computed property
	const filterProducts = products.filter((product) => product.title.toLowerCase().includes(searchTerm.toLowerCase()));

	console.log("filterProducts", filterProducts);

	return (
		<div className="relative w-full mx-auto p-4 max-w-xs">
			<Input className="w-full max-w-xs" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value.trim())} />
			{filterProducts.length > 0 && searchTerm.length > 0 && (
				<ul className="absolute left-5 right-5 z-30 bg-pink-700">
					{filterProducts.map((product) => {
						return (
							<li key={product.id}>
								<Link to={`/venue/${product.id}`} className="block p-4 hover:bg-gray-600">
									{product.name}
								</Link>
							</li>
						);
					})}
				</ul>
			)}
		</div>
	);
}

export default ProductFilter;