import { React } from "react";
import "./Label.css";

export default function Label(label) {
	console.log(label);
	return (
		<div className="label">
			<div className="name-and-con">
				<div>{label.label.Name}</div>
				<div>{label.label.Confidence.toFixed(2)}%</div>
			</div>
			{label.label.Parents.length > 0 && (
				<div>
					<br />
					<div className="parents">PARENTS</div>
				</div>
			)}
			{label.label.Parents.map((e) => (
				<p>{e.Name}</p>
			))}
			<br />
		</div>
	);
}
