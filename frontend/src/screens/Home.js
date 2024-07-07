import React, { useEffect, useState } from "react";
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
		try {
			const response = await fetch(`${BASE_URL}/api/foodData`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			});
			const data = await response.json();
			setFoodItem(data[0]);
			setFoodCat(data[1]);
		} catch (error) {
			console.error("Error fetching food data:", error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		loadData();
	}, []);

	return (
		<div>
			<Navbar />
			{loading ? (
				<div className="text-center mt-5">
					<div className="spinner-border" role="status">
						<span className="visually-hidden">Loading...</span>
					</div>
				</div>
			) : (
				<>
					<div
						id="carouselExampleFade"
						className="carousel slide carousel-fade"
						data-bs-ride="carousel"
						style={{ objectFit: "contain !important" }}
					>
						<div className="carousel-inner" id="carousel">
							<div className="carousel-caption" style={{ zIndex: "10" }}>
								<div className="d-flex justify-content-center">
									<input
										className="form-control me-2 w-75 bg-white text-dark"
										type="search"
										placeholder="Type in..."
										aria-label="Search"
										value={search}
										onChange={(e) => setSearch(e.target.value)}
									/>
									<button
										className="btn text-white bg-danger"
										type="button"
										onClick={() => setSearch("")}
									>
										X
									</button>
								</div>
							</div>
							{["burger", "pastry", "barbeque", "paneer"].map((item, index) => (
								<div className={`carousel-item ${index === 0 ? "active" : ""}`} key={item}>
									<img
										src={`https://source.unsplash.com/random/900x700/?${item}`}
										className="d-block w-100"
										style={{ filter: "brightness(30%)" }}
										alt={item}
									/>
								</div>
							))}
						</div>
						<button
							className="carousel-control-prev"
							type="button"
							data-bs-target="#carouselExampleFade"
							data-bs-slide="prev"
						>
							<span className="carousel-control-prev-icon" aria-hidden="true"></span>
							<span className="visually-hidden">Previous</span>
						</button>
						<button
							className="carousel-control-next"
							type="button"
							data-bs-target="#carouselExampleFade"
							data-bs-slide="next"
						>
							<span className="carousel-control-next-icon" aria-hidden="true"></span>
							<span className="visually-hidden">Next</span>
						</button>
					</div>
					<div className="container">
						{foodCat.length > 0 ? (
							foodCat.map((category) => (
								<div className="row mb-3" key={category._id}>
									<div className="fs-3 m-3">{category.CategoryName}</div>
									<hr />
									{foodItem.length > 0 ? (
										foodItem
											.filter(
												(item) =>
													item.CategoryName === category.CategoryName &&
													item.name.toLowerCase().includes(search.toLowerCase())
											)
											.map((filteredItem) => (
												<div className="col-12 col-md-6 col-lg-3" key={filteredItem._id}>
													<Card foodItem={filteredItem} options={filteredItem.options[0]} />
												</div>
											))
									) : (
										<div>No such data found.</div>
									)}
								</div>
							))
						) : (
							<div>No categories available.</div>
						)}
					</div>
				</>
			)}
			<Footer />
		</div>
	);
}
