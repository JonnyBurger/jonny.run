import React, {Component} from 'react';
import styled from 'styled-components';
import ordinal from 'ordinal';
import {differenceInCalendarDays} from 'date-fns';

const Container = styled.div`
	text-align: center;
`;

const AppHeader = styled.div`
	background-color: white;
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	color: black;
`;

const Title = styled.div`
	font-weight: 700;
	font-family: 'Roboto Condensed';
	font-size: 3em;
`;

const Counter = styled.div`
	opacity: 0.4;
	font-weight: bold;
	font-family: 'Roboto Condensed';
`;

const dayOne = new Date('2016-02-19');

class App extends Component {
	render() {
		return (
			<Container>
				<AppHeader>
					<Title>RUN EVERY DAY</Title>
					<Counter>
						Today is the{' '}
						{ordinal(differenceInCalendarDays(new Date(), dayOne) + 1)} day
					</Counter>
				</AppHeader>
			</Container>
		);
	}
}

export default App;
