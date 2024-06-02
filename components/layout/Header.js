import React, { useContext, useState } from "react";
import Search from "../ui/Search";
import Navigation from "./Navigation";
import Link from "next/link";
import Button from "../ui/Button";
import { FirebaseContext } from "../../firebase";

const Header = () => {
	const [isOpen, setIsOpen] = useState(false);
	const { user, firebase } = useContext(FirebaseContext);

	return (
		<div className="Navbar">
			<Link className="nav-logo" href={"/"}>
				P
			</Link>
			<div className={`nav-items ${isOpen && "open"}`}>
				<Search />
				<Link href="/" className="nav-item">
					Inicio
				</Link>
				<Link href="/populars" className="nav-item">
					Populares
				</Link>
				{user ? (
					<Link href="/newProduct" className="nav-item">
						Nuevo producto
					</Link>
				) : null}

				<div className="user-container">
					{user ? (
						<>
							<Button
								type="button"
								bgColor="true"
								onClick={() => firebase.signOut()}
							>
								Cerrar sesion
							</Button>
						</>
					) : (
						<>
							<Link href="/login">
								<Button bgColor="true">Login</Button>
							</Link>
							<Link href="/createAccount">
								<Button>Crear cuenta</Button>{" "}
							</Link>
						</>
					)}
				</div>
			</div>
			<div
				onClick={() => setIsOpen(!isOpen)}
				className={`nav-toggle ${isOpen && "open"}`}
			>
				<div className="bar"></div>
			</div>
		</div>
	);
};

export default Header;

{
	// import React, { useContext, useState } from "react";
	// import Search from "../ui/Search";
	// import Navigation from "./Navigation";
	// import Link from "next/link";
	// import Button from "../ui/Button";
	// import { FirebaseContext } from "../../firebase";
	// const Header = () => {
	// 	const [isOpen, setIsOpen] = useState(false);
	// 	const { user, firebase } = useContext(FirebaseContext);
	// 	return (
	// 		<header>
	// 			<div className="header-container">
	// 				<div className="nav-container">
	// 					<Link href={"/"}>
	// 						<p className="logo">P</p>
	// 					</Link>
	// 					<Search />
	// 					<Navigation />
	// 				</div>
	// 				<div className="user-config-container">
	// 					{user ? (
	// 						<>
	// 							<p className="user-name">Hola: {user.displayName}</p>
	// 							<Button
	// 								type="button"
	// 								bgColor="true"
	// 								onClick={() => firebase.signOut()}
	// 							>
	// 								Cerrar sesion
	// 							</Button>
	// 						</>
	// 					) : (
	// 						<>
	// 							<Link href="/login">
	// 								<Button bgColor="true">Login</Button>
	// 							</Link>
	// 							<Link href="/createAccount">
	// 								<Button>Crear cuenta</Button>
	// 							</Link>
	// 						</>
	// 					)}
	// 				</div>
	// 			</div>
	// 		</header>
	// 	);
	// };
	// export default Header;
}
