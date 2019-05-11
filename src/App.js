import React, {Component} from 'react';
import styled from 'styled-components';
import Autosize from 'react-virtualized-auto-sizer';
import ordinal from 'ordinal';
import Runs from './Runs';
import Faq from './Faq';
import getDay from './get-day';
import {Header} from './SingleRun';

const Container = styled.div`
	text-align: center;
	height: 100%;
	width: 100%;
	position: absolute;
	display: flex;
	flex-direction: column;
`;

const AppHeader = styled.div`
	background-color: white;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	color: black;
	padding-left: 30px;
	padding-right: 30px;
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
					<div style={{width: 40}} />
					<Counter>Today is the {ordinal(getDay(new Date()))} day</Counter>
					<div style={{flex: 1}} />
					<div style={{height: 20}} />
					<HeaderButtons />
				</AppHeader>
				<div style={{flex: 1}}>
					<Runs />
				</div>
			</Container>
		);
	}
}

export default App;
