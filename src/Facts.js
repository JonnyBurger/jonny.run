import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
	flex-direction: row;
	display: flex;
	max-width: 900px;
	border-top: 1px solid black;
	border-bottom: 1px solid black;
	padding-top: 12px;
	padding-bottom: 12px;
`;

const Fact = styled.div`
	flex: 1;
	text-align: left;
`;

const Title = styled.div`
	font-size: 14px;
	font-weight: bold;
`;

const Num = styled.div`
	font-size: 30px;
	font-weight: bold;
`;

const getCountries = () =>
	fetch(
		process.env.NODE_ENV === 'production'
			? `https://api.jonny.run/.netlify/functions/index/countries`
			: `http://localhost:1200/countries`
	).then(response => response.json());

export default class extends React.Component {
	state = {
		countries: null
	};
	componentDidMount() {
		getCountries().then(data => {
			this.setState({
				countries: data.countries
			});
		});
	}
	render() {
		const {total, runs} = this.props;
		return (
			<Container>
				<Fact>
					<Title>Days</Title>
					<Num>{total}</Num>
				</Fact>
				<Fact>
					<Title>Did run today yet</Title>
					<Num>{runs[0].distance ? 'Yes' : 'No'}</Num>
				</Fact>
				<Fact>
					<Title>World Record progress</Title>
					<Num>{((total / 19032) * 100).toFixed(2)}%</Num>
				</Fact>
				<Fact>
					<Title>Countries</Title>
					<Num>
						{this.state.countries ? this.state.countries.length : '...'}
					</Num>
				</Fact>
			</Container>
		);
	}
}
