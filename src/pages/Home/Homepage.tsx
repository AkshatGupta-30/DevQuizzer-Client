import {memo} from "react";
import "./Homepage.scss";
import CategoryContextProvider from "../../context/CategoryContext";
import { BottomSection, TopSection } from "../../components/TopBottom/TopBottom";
import CategorySection from "../../components/CategorySection/CategorySection";

const Homepage = memo(() => {
	return (
		<div id='HomePage'>
			<main>
				<TopSection />
				<CategoryContextProvider>
					<CategorySection />
				</CategoryContextProvider>
				<BottomSection />
			</main>
		</div>
	);
});

export default Homepage;
