import React, {Component} from 'react';
import styled from 'styled-components';
import ordinal from 'ordinal';
import {differenceInCalendarDays} from 'date-fns';
import Runs from './Runs';
import Faq from './Faq';
import getDay from './get-day';

const Container = styled.div`
	text-align: center;
`;

const AppHeader = styled.div`
	background-color: white;
	padding-top: 200px;
	padding-bottom: 100px;
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

const Button = styled.div`
	cursor: pointer;
	font-weight: bold;
	padding: 10px 40px;
	border: 1px solid black;
	font-family: 'Roboto Condensed';
	color: #333;
	&:hover {
		background: #333;
		color: white;
	}
	text-decoration: none;
`;

class HeaderButtons extends Component {
	state = {
		faq: false
	};

	render() {
		return (
			<>
				<div style={{flexDirection: 'row', display: 'flex'}}>
					<a
						style={{textDecoration: 'none'}}
						target="_blank"
						rel="noreferrer noopener"
						href="https://www.youtube.com/watch?v=Yb7ZIl3Qaes"
					>
						<Button>Watch the video</Button>
					</a>
					<div style={{width: 10}} />
					<Button
						onClick={() => {
							this.setState(prevState => ({
								faq: !prevState.faq
							}));
						}}
					>
						FAQ
					</Button>
					<div style={{width: 10}} />
					<a
						style={{textDecoration: 'none'}}
						target="_blank"
						rel="noreferrer noopener"
						href="https://twitter.com/JNYBGR"
					>
						<Button>@JNYBGR</Button>
					</a>
				</div>
				{this.state.faq ? <Faq /> : null}
			</>
		);
	}
}

class App extends Component {
	render() {
		return (
			<Container>
				<AppHeader>
					<Title>RUN EVERY DAY</Title>
					<Counter>Today is the {ordinal(getDay(new Date()))} day</Counter>
					<div style={{height: 20}} />
					<HeaderButtons />
				</AppHeader>
				<Runs />
			</Container>
		);
	}
}

export default App;
