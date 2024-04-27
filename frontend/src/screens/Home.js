import { React, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import { BASE_URL } from "../helper";

export default function Home() {
	const [foodCat, setFoodCat] = useState([]);
	const [foodItem, setFoodItem] = useState([]);
	const [search, setSearch] = useState("");
	const [loading, setLoading] = useState(true);

	const loadData = async () => {
		setLoading(true);
		let response = await fetch(`${BASE_URL}/api/foodData`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});

		response = await response.json();
		setFoodItem(response[0]);
		setFoodCat(response[1]);
		setLoading(false);
	};

	useEffect(() => {
		loadData();
	}, []);

	if (loading) {
	    return (
	      <div>
	        <Navbar />
	        <div className="text-center mt-5">
	          <div class="spinner-border" role="status">
	            <span class="visually-hidden">Loading...</span>
	          </div>
	        </div>
	        <Footer />
	      </div>
	    );
  	}

	return (
		<div>
			<div>
				<Navbar />
			</div>
			<div>
				<div
					id="carouselExampleFade"
					className="carousel slide carousel-fade "
					data-bs-ride="carousel"
					style={{ objectFit: "contain !important" }}
				>
					<div className="carousel-inner " id="carousel">
						<div className=" carousel-caption  " style={{ zIndex: "10" }}>
							<div className="d-flex justify-content-center">
								{/* justify-content-center, copy this <form> from navbar for search box */}
								<input
									className="form-control me-2 w-75 bg-white text-dark"
									type="search"
									placeholder="Type in..."
									aria-label="Search"
									value={search}
									onChange={(e) => {
										setSearch(e.target.value);
									}}
								/>
								<button
									className="btn text-white bg-danger"
									type="submit"
									onClick={() => {
										setSearch("");
									}}
								>
									X
								</button>
							</div>
						</div>
						<div className="carousel-item active">
							<img
								src="https://source.unsplash.com/random/900x700/?burger"
								className="d-block w-100  "
								style={{ filter: "brightness(30%)" }}
								alt="..."
							/>
						</div>
						<div className="carousel-item">
							<img
								src="https://source.unsplash.com/random/900x700/?pastry"
								className="d-block w-100 "
								style={{ filter: "brightness(30%)" }}
								alt="..."
							/>
						</div>
						<div className="carousel-item">
							<img
								src="https://source.unsplash.com/random/900x700/?barbeque"
								className="d-block w-100 "
								style={{ filter: "brightness(30%)" }}
								alt="..."
							/>
						</div>
						<div className="carousel-item">
							<img
								src="https://source.unsplash.com/random/900x700/?paneer"
								className="d-block w-100 "
								style={{ filter: "brightness(30%)" }}
								alt="..."
							/>
						</div>
					</div>
					<button
						className="carousel-control-prev"
						type="button"
						data-bs-target="#carouselExampleFade"
						data-bs-slide="prev"
					>
						<span
							className="carousel-control-prev-icon"
							aria-hidden="true"
						></span>
						<span className="visually-hidden">Previous</span>
					</button>
					<button
						className="carousel-control-next"
						type="button"
						data-bs-target="#carouselExampleFade"
						data-bs-slide="next"
					>
						<span
							className="carousel-control-next-icon"
							aria-hidden="true"
						></span>
						<span className="visually-hidden">Next</span>
					</button>
				</div>
			</div>
			<div className="container">
				{foodCat !== []
					? foodCat.map((data) => {
							return (
								<div className="row mb-3">
									<div key={data._id} className="fs-3 m-3">
										{data.CategoryName}
									</div>
									<hr />
									{foodItem !== [] ? (
										foodItem
											.filter(
												(items) =>
													items.CategoryName === data.CategoryName &&
													items.name
														.toLowerCase()
														.includes(search.toLowerCase())
											)
											.map((filterItems) => {
												return (
													<div
														key={filterItems._id}
														className="col-12 col-md-6 col-lg-3"
													>
														<Card
															foodItem={filterItems}
															options={filterItems.options[0]}
														/>
													</div>
												);
											})
									) : (
										<div>No such data found.</div>
									)}
								</div>
							);
					  })
					: ""}
			</div>
			<div>
				<Footer />
			</div>
		</div>
	);
}
