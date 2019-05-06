import React from 'react';
import styled from 'styled-components';
import {format} from 'date-fns';
import StravaIcon from './strava-brands.svg';

const Row = styled.div`
	display: flex;
	flex-direction: row;
	font-family: 'Roboto Condensed';
	text-align: left;
	height: 36px;
	border-bottom: 1px solid black;
	align-items: center;
`;

const Day = styled.div`
	flex: 1;
`;

const DateColumn = styled.div`
	flex: 2;
`;

const Distance = styled.div`
	flex: 1;
`;

const City = styled.div`
	flex: 2;
`;
const Country = styled.div`
	flex: 2;
`;
const StravaLink = styled.div`
	flex: 1;
`;

export const Header = () => {
	return (
		<Row>
			<DateColumn>Date</DateColumn>
			<Day>Day</Day>
			<Distance>Distance</Distance>
			<City>City</City>
			<Country>Country</Country>
			<StravaLink>Strava</StravaLink>
		</Row>
	);
};

class SingleRun extends React.Component {
	render() {
		return (
			<Row>
				<DateColumn>
					{format(new Date(this.props.run.date), 'dd.MM.YYY')}
				</DateColumn>
				<Day>{this.props.run.day}</Day>
				<Distance>{(this.props.run.distance / 1000).toFixed(1)}km</Distance>
				<City>{this.props.run.city}</City>
				<Country>{this.props.run.country}</Country>
				<StravaLink>
					{this.props.run.strava_id ? (
						<a
							target="_blank"
							rel="noopener noreferrer"
							href={`https://strava.com/activities/${this.props.run.strava_id}`}
						>
							<img
								style={{
									height: 24,
									width: 24
								}}
								src={StravaIcon}
								alt="Strava activity"
							/>
						</a>
					) : null}
				</StravaLink>
			</Row>
		);
	}
}
export default SingleRun;
