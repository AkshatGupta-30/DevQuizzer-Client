import React from "react";
import { Link } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./Footer.scss";

const Footer = React.memo(() => {
	return (
		<footer>
			<div className='social-media'>
				<Link
					to='https://www.linkedin.com/in/akshatgupta30/'
					target='_blank'
					className='bi bi-linkedin social-icons'
				/>
				<Link to='https://github.com/AkshatGupta-30' target='_blank' className='bi bi-github social-icons' />
				<Link
					to='https://www.facebook.com/profile.php?id=61559896502968'
					target='_blank'
					className='bi bi-facebook social-icons'
				/>
				<Link
					to='https://www.instagram.com/_._akshat.gupta_._/'
					target='_blank'
					className='bi bi-instagram social-icons'
				/>
				<Link to='https://x.com/Akshat_Gupta_30' target='_blank' className='bi bi-twitter-x social-icons' />
			</div>
			<div className='copyright'>
				Copyright &#169; 2024; Designed by <b>Akshat Gupta</b>
			</div>
		</footer>
	);
});

export default Footer;
