import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Badge from "react-bootstrap/Badge";
import Cart from "../screens/Cart";
import Modal from "../Modal";
import { useCart } from "./ContextReducer";

function Navbar() {
	const [cartView, setCartView] = useState(false);
	const navigate = useNavigate();
	let data = useCart();
	const handleLogout = () => {
		localStorage.removeItem("authToken");
		navigate("/login");
	};

	return (
		<div>
			<nav className="navbar navbar-expand-lg navbar-dark bg-danger">
				<div className="container-fluid">
					<Link className="navbar-brand fs-1 fst-italic" to="/">
						FoodMania
					</Link>
					<button
						className="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarNav"
						aria-controls="navbarNav"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarNav">
						<ul className="navbar-nav me-auto ">
							<li className="nav-item">
								<Link className="nav-link active" aria-current="page" to="/">
									Home
								</Link>
							</li>
							{localStorage.getItem("authToken") ? (
								<li className="nav-item">
									<Link
										className="nav-link active"
										aria-current="page"
										to="/myOrderData"
									>
										My Orders
									</Link>
								</li>
							) : (
								""
							)}
						</ul>
						{!localStorage.getItem("authToken") ? (
							<div className="d-flex">
								<Link className="btn bg-white text-danger mx-1" to="/login">
									Login
								</Link>

								<Link
									className="btn bg-white text-danger mx-1"
									to="/createuser"
								>
									SignUp
								</Link>
							</div>
						) : (
							<div>
								<div
									className="btn bg-white text-danger mx-1"
									onClick={() => {
										setCartView(true);
									}}
								>
									<Badge pill bg="danger">
										{/* <ShoppingCartIcon /> */}
										{data.length}
									</Badge>{" "}
									Cart
								</div>
								{cartView ? (
									<Modal
										onClose={() => {
											setCartView(false);
										}}
									>
										<Cart></Cart>
									</Modal>
								) : null}
								<div
									className="btn bg-white text-danger mx-1"
									onClick={handleLogout}
								>
									Logout{" "}
								</div>
							</div>
						)}
					</div>
				</div>
			</nav>
		</div>
	);
}

export default Navbar;
