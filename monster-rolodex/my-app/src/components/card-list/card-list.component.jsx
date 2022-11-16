import Card from "../card/card.component";
import "./card-list.styles.css";

// Functional components only use props and sometimes props with forwardRef
const CardList = ({ monsters }) => (
	<div className="card-list">
		{monsters.map((monster) => {
			return <Card monster={monster} />;
		})}
	</div>
);

export default CardList;
