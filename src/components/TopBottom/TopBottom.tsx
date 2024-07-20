import { memo } from "react";
import "./TopBottom.scss"

export const TopSection = memo(() => {
	return (
		<section className='top'>
			<label>Welcome to DevQuizzers!</label>
			<div className='content'>
				Are you a programmer looking to test and improve your coding skills? Look no further than devQuizzers -
				the ultimate quiz app for developers!. Whether you're a seasoned programmer or just starting your coding
				journey, devQuizzers offers a fun and engaging way to challenge yourself and stay on top of your game.
				With a wide range of quizzes covering various programming languages and topics, you'll never run out of
				ways to put your knowledge to the test.
			</div>
		</section>
	);
});

export const BottomSection = memo(() => {
	return (
		<section className='bottom'>
			<label>Stay Up-to-Date</label>
			<div className='content'>
				The world of programming is constantly evolving, with new languages, frameworks, and best practices
				emerging all the time. devQuizzers helps you stay ahead of the curve by offering quizzes on the latest
				technologies and trends. Keep your skills sharp and your mind agile as you navigate the ever-changing
				landscape of software development.
			</div>
		</section>
	);
});
