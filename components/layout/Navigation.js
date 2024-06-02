import React, { useContext } from "react";
import Link from "next/link";
import { FirebaseContext } from "../../firebase";

const Navigation = () => {
	const { user, firebase } = useContext(FirebaseContext);
	return (
		<nav>
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
		</nav>
	);
};

export default Navigation;
