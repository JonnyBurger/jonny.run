import React, {Component} from 'react';
import styled from 'styled-components';
import ordinal from 'ordinal';
import Runs from './Runs';
import Faq from './Faq';
import getDay from './get-day';

const Container = styled.div`
	display: flex;
	flex-direction: column;
`;

const AppHeader = styled.div`
	background-color: white;
	align-items: center;
	justify-content: center;
	color: black;
	margin: auto;
	padding-left: 30px;
	padding-right: 30px;
	margin-bottom: 20px;
	display: flex;
	flex-direction: column;
	@media screen and (max-width: 1000px) {
		flex-direction: column;
	}
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

const ButtonContainer = styled.div`
	flex-direction: row;
	display: flex;
	@media screen and (max-width: 800px) {
		flex-direction: column;
		text-align: center;
	}
`;

class HeaderButtons extends Component {
	state = {
		faq: false
	};

	render() {
		return (
			<>
				{this.state.faq ? <Faq /> : null}

				<ButtonContainer>
					<a
						style={{textDecoration: 'none'}}
						target="_blank"
						rel="noreferrer noopener"
						href="https://www.youtube.com/watch?v=Yb7ZIl3Qaes"
					>
						<Button>Watch the video</Button>
					</a>
					<div style={{width: 10, height: 10}} />
					<Button
						onClick={() => {
							this.setState(prevState => ({
								faq: !prevState.faq
							}));
						}}
					>
						FAQ
					</Button>
					<div style={{width: 10, height: 10}} />
					<a
						style={{textDecoration: 'none'}}
						target="_blank"
						rel="noreferrer noopener"
						href="https://twitter.com/JNYBGR"
					>
						<Button>@JNYBGR</Button>
					</a>
				</ButtonContainer>
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
