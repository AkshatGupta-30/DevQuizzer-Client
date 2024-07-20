import { memo, useEffect, useContext } from "react";
import "./QuestionRequestModal.scss";
import { CategoryContext } from "../../context/CategoryContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { createPortal } from "react-dom";
import { QuestionRequestContext } from "../../context/QuestionRequestContext";

const QuestionRequestModal = memo(({ closeModal }: { closeModal: () => void }) => {
	const { categories } = useContext(CategoryContext);
	const { ques, changedValues, submit } = useContext(QuestionRequestContext);

	useEffect(() => {
		document.body.style.overflowY = "hidden";
		return () => {
			document.body.style.overflowY = "scroll";
		};
	});

	return createPortal(
		<>
			<div className='background' onClick={closeModal}></div>
			<div id='ques-request'>
				<button type='button' className='close-btn' onClick={closeModal}>
					<FontAwesomeIcon icon={faXmark} className='icon' />
				</button>
				<h1>Add Question Request</h1>
				<div className='form'>
					<label>Category</label>
					<select id='Category' name='category' value={ques.category} onChange={changedValues}>
						<option value='Category' disabled>
							Category
						</option>
						{categories.map((cat, index) => (
							<option key={index} value={cat.id}>
								{cat.name}
							</option>
						))}
					</select>
					<label>Question</label>
					<input
						type='text'
						autoComplete='off'
						name='question'
						value={ques.question}
						onChange={changedValues}
						required
					/>
					<label>Option 1</label>
					<input
						type='text'
						autoComplete='off'
						name='option1'
						value={ques.option1}
						onChange={changedValues}
						required
					/>
					<label>Option 2</label>
					<input
						type='text'
						autoComplete='off'
						name='option2'
						value={ques.option2}
						onChange={changedValues}
						required
					/>
					<label>
						Option 3<span>(Optional)</span>
					</label>
					<input
						type='text'
						autoComplete='off'
						name='option3'
						value={ques.option3}
						onChange={changedValues}
					/>
					<label>
						Option 4<span>(Optional)</span>
					</label>
					<input
						type='text'
						autoComplete='off'
						name='option4'
						value={ques.option4}
						onChange={changedValues}
					/>
					<label>Answer</label>
					<input
						type='number'
						min={1}
						max={4}
						autoComplete='off'
						name='answer'
						value={ques.answer}
						onChange={changedValues}
						required
					/>
					<label>Difficulty</label>
					<select id='Difficulty' name='difficulty' value={ques.difficulty} onChange={changedValues}>
						<option value='Difficulty' disabled>
							Difficulty
						</option>
						<option value='easy'>Easy</option>
						<option value='medium'>Medium</option>
						<option value='hard'>Hard</option>
					</select>
					<label>Explaination</label>
					<input
						type='text'
						autoComplete='off'
						name='explaination'
						value={ques.explaination}
						onChange={changedValues}
						required
					/>
					<label>LinkedIn Username</label>
					<input
						type='text'
						autoComplete='off'
						name='linkedIn'
						value={ques.linkedIn}
						onChange={changedValues}
					/>

					<div className='btn-container'>
						<button type='button' id='cancel' onClick={closeModal}>
							Cancel
						</button>
						<button
							type='submit'
							id='send'
							onClick={async () => {
								if (await submit()) {
									closeModal();
								}
							}}>
							Send
						</button>
					</div>
				</div>
			</div>
		</>,
		document.querySelector(".modal-portal")!
	);
});

export default QuestionRequestModal;
