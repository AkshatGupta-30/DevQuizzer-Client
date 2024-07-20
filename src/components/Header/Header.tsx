import React from "react";
import { NavLink } from "react-router-dom";

import "./Header.scss";

const Header = React.memo(() => {
	return (
		<NavLink to={"/"} className={"navbar"}>
			Dev Quizzer
		</NavLink>
	);
})

export default Header;
