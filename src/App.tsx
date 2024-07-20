import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import "./App.scss";
import Footer from "./components/Footer/Footer";
import Homepage from "./pages/Home/Homepage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import QuizzPage from "./pages/Quizz/QuizzPage";

const App = React.memo(() => {
	return (
		<div className='App'>
			<ToastContainer />
			<BrowserRouter>
				<Header />
				<Routes>
					<Route path='/' element={<Homepage />} />
					<Route path="/quizz/:lang" element={<QuizzPage/>}/>
				</Routes>
				<Footer />
			</BrowserRouter>
		</div>
	);
});

export default App;
