import { ChangeEvent, memo, useContext, useEffect, useState } from "react";
import {CategoryContext} from "../../context/CategoryContext";
import { faArrowsRotate, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LanguageCards from "../LanguageCard/LanguageCard";
import QuestionRequestContextProvider from "../../context/QuestionRequestContext";
import QuestionRequestModal from "../QuestionRequestModal/QuestionRequestModal";
import "./CategorySection.scss"

const CategorySection = memo(() => {
	const { setSearch, isLoading, error, onMounted } = useContext(CategoryContext);
	const [showModal, setShowModal] = useState<boolean>(false);
	useEffect(() => {
		onMounted();
	}, []);

	const closeModal = () => setShowModal(false);

	return (
		<section className='quizzes'>
			<div className='heading'>
				<label>Computer Skills!</label>
				<form>
					<div className='search'>
						<FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon" />
						<input
							className='search-input'
							type='search'
							placeholder='Search'
							onChange={(e: ChangeEvent<HTMLInputElement>) => {
								setSearch(e.target.value);
							}}
						/>
					</div>
				</form>
			</div>
			<hr />
			{isLoading && (
				<div className='wrapper'>
					<div className='loading'>Quizz</div>
				</div>
			)}
			{!isLoading && error && (
				<div className='wrapper'>
					<div className='error'>{error}</div>
					<button className='try-again' onClick={() => onMounted()}>
						<FontAwesomeIcon icon={faArrowsRotate} className='refresh' />
						Try Again
					</button>
				</div>
			)}
			{!isLoading && !error && (
				<>
					<div className='language-cards'>
						<LanguageCards />
					</div>
					<hr />
					<button id='add-questions' onClick={() => setShowModal(true)}>
						<i className='fa-solid fa-plus add-icon'></i>Add a Question Request
					</button>
					{showModal && (
						<QuestionRequestContextProvider>
							<QuestionRequestModal closeModal={closeModal} />
						</QuestionRequestContextProvider>
					)}
				</>
			)}
		</section>
	);
});

export default CategorySection;
