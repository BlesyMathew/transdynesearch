import React, { useState } from "react";
import './Searching.css'


export default function Searching() {

	const [searchItem, setSearchItem] = useState("");
	const [cocktails, setCocktails] = useState([]);

	const searchCocktails = async (name) => {
        try {
          const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);
          const data = await response.json();
          setCocktails(data.drinks || []);
        } catch (error) {
          console.error("Error fetching cocktail data:", error);
          setCocktails([]); 
        }
      };
      
	const handleSearch = (e) => {
		setSearchItem(e.target.value);
		searchCocktails(e.target.value);
	};

	return (
		<div className='outer'>
			<h1>Cocktail Search</h1>
			<input
				type="text"
				placeholder="Search for a cocktail..."
				value={searchItem}
				onChange={handleSearch}
				style={{ padding: "10px", width: "80%", maxWidth: "500px" }}
			/>
			<div className="cockTailList">
				{cocktails.length > 0 ? (
					<ul style={{ listStyle: "none", padding: 0 }}>
						{cocktails.map((cocktail) => (
							<>
								
									<li key={cocktail.idDrink} style={{ marginBottom: "20px" }}>
										<h2>{cocktail.strDrink}</h2>
										<img
											src={cocktail.strDrinkThumb}
											alt={cocktail.strDrink}
											style={{ width: "200px", borderRadius: "8px" }}
										/>
										<p>{cocktail.strInstructions}</p>
									</li>
								
							</>
						))}
					</ul>
				) : (
					<p>No cocktails found.Try another one!</p>
				)}
			</div>
		</div>
	);
}
