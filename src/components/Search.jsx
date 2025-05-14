import React, { useState } from "react";


const ProductSearch = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim() === "") {
      setSuggestions([]);
      return;
    }

    try {
      const response = await fetch(`http://localhost:3333/products?search=${encodeURIComponent(value)}`);
      const data = await response.json();
      setSuggestions(data);
    } catch (err) {
      console.error("Errore nella fetch:", err);
    }
  };

  return (
    <div className="product-search">
      <h1>Lista prodotti</h1>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Cerca un prodotto..."
      />
      <div className="suggestions">
        {suggestions.map(product => (
          <div key={product.id} className="suggestion-item">
            {product.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductSearch;
