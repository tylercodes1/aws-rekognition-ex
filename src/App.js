import logo from "./logo.svg";
import "./App.css";
import { React, useEffect, useState } from "react";
import Label from "./component/Label";

function App() {
	const [error, setError] = useState(false);
	const [labels, setLabels] = useState([]);
	useEffect(() => {
		var AWS = require("aws-sdk");
		var uuid = require("uuid");

		const bucket = "aws-rekognition-example-tk";
		const photo = "TylerViolin.jpg";

		const config = new AWS.Config({
			accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
			secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
			region: process.env.REACT_APP_AWS_REGION,
		});

		AWS.config = config;

		const client = new AWS.Rekognition();
		const params = {
			Image: {
				S3Object: {
					Bucket: bucket,
					Name: photo,
				},
			},
			MaxLabels: 10,
		};

		client.detectLabels(params, function (err, response) {
			if (err) {
				setError(true);
			} else {
				setLabels(response.Labels);
			}
		});
	}, []);

	return (
		<div className="App">
			<header className="App-header">
				<h1>Learn AWS Rekognition</h1>
				<img src="./TylerViolin.jpg" alt="Tyler Playing the Violin" />
				{labels.map((e) => {
					return <Label label={e} />;
				})}
			</header>
		</div>
	);
}

export default App;
