import React, { useContext } from "react";
import "./LanguageCard.scss";
import { CategoryContext } from "../../context/CategoryContext";
import { Link } from "react-router-dom";
import Category from "../../oops/models/Category";

const Card = React.memo((category: Category) => {
	return (
		<Link
			to={`/quizz/${category.name}`}
			state={{ category: category }}
			className='card'
			style={{ borderColor: category.color, color: category.color }}>
			<img src={category.image} alt={category.name} className='svg' />
			<label>{category.name}</label>
			<div className='question-length'>{category.questions.length} Questions</div>
		</Link>
	);
});

const LanguageCards = React.memo(() => {
	const { categories, search } = useContext(CategoryContext);
	return (
		<div className='all-langs'>
			{categories
				.filter((category: Category) => {
					return search.toLowerCase() === "" ? category : category.name.toLowerCase().includes(search);
				})
				.map((category: Category) => {
					return <Card {...category} key={category.id} />;
				})}
		</div>
	);
});

export default LanguageCards;
