import React from 'react';
import styled from 'styled-components';
import format from 'date-fns/format';
import addDays from 'date-fns/addDays';
import getTimezoneOffset from 'get-timezone-offset';
import StravaIcon from './strava-brands.svg';
import treadmill from './treadmill.svg';
import bandaid from './band-aid-solid.svg';
import thermometer from './thermometer.svg';
import drink from './glass-solid.svg';
import infoCircle from './info-circle-regular.svg';
// import {LOS_ANGELES, LONDON, SOFIA, LISBOA} from './timezones';
import Tooltip from './Tooltip';
import getFlag from './get-flag';
import {useMedia} from 'react-use-media';

const Row = styled.div`
	display: flex;
	flex-direction: row;
	font-family: 'Roboto Condensed';
	text-align: left;
	padding-left: 30px;
	padding-right: 30px;
	border-bottom: 1px solid black;
	align-items: center;
`;

const Day = styled.div`
	flex: 1;
	@media screen and (max-width: 800px) {
		display: inline-block;
		margin-right: 15px;
	}
`;

const Time = styled.div`
	flex: 1;
	@media screen and (max-width: 800px) {
		display: inline-block;
		margin-right: 15px;
	}
`;

const DateColumn = styled.div`
	flex: 2;
	@media screen and (max-width: 800px) {
		display: inline-block;
		margin-right: 15px;
	}
`;

const Distance = styled.div`
	flex: 1;
	@media screen and (max-width: 800px) {
		display: inline-block;
		margin-right: 15px;
	}
`;

const City = styled.div`
	flex: 2;
	display: flex;
	align-items: center;
	@media screen and (max-width: 800px) {
		display: inline-block;
		margin-right: 15px;
	}
`;
const StravaLink = styled.div`
	flex: 1;
	@media screen and (max-width: 800px) {
		display: inline-block;
		margin-right: 15px;
	}
`;

const Treadmill = styled.div`
	width: 30px;
	justify-content: center;
	align-items: center;
`;

const Injury = styled.div`
	width: 30px;
	@media screen and (max-width: 800px) {
		display: inline-block;
	}
`;

const Drunk = styled.div`
	width: 30px;
	@media screen and (max-width: 800px) {
		display: inline-block;
	}
`;

const TreadmillIcon = () => (
	<img
		style={{width: 24, height: 24, marginTop: 8}}
		src={treadmill}
		alt="Treadmill"
	/>
);

const InjuryIcon = () => (
	<img
		style={{width: 20, height: 20, marginTop: 6}}
		src={bandaid}
		alt="Injury"
	/>
);

const SickIcon = () => (
	<img
		style={{width: 20, height: 20, marginTop: 6}}
		src={thermometer}
		alt="Sick"
	/>
);

const DrunkIcon = () => (
	<img style={{width: 16, height: 16, marginTop: 6}} src={drink} alt="Drunk" />
);

export const Header = () => {
	const isMobile = useMedia('(max-width: 800px)');
	if (isMobile) {
		return null;
	}
	return (
		<div>
			<Row style={{background: 'white', flex: 0}}>
				<Time>Day</Time>
				<DateColumn>Date</DateColumn>
				<Day>Time</Day>
				<Distance>Distance</Distance>
				<City>City</City>
				<StravaLink>Run</StravaLink>
				<Treadmill>
					<Tooltip content="Treadmill">
						<TreadmillIcon />
					</Tooltip>
				</Treadmill>
				<Injury>
					<Tooltip content="Injury">
						<InjuryIcon />
					</Tooltip>
				</Injury>
				<Injury>
					<Tooltip content="Sickness">
						<SickIcon />
					</Tooltip>
				</Injury>
				<Drunk>
					<Tooltip content="Drunk">
						<DrunkIcon />
					</Tooltip>
				</Drunk>
			</Row>
		</div>
	);
};

const getTime = run => {
	/*
	if (run.country === 'United States') {
		return new Date(
			// Intentional Zurich
			new Date(run.date).getTime() +
				getTimezoneOffset('Europe/Zurich', new Date(run.date)) * 1000 * 60
		);
	}
	if (run.country === 'United Kingdom') {
		return new Date(
			new Date(run.date).getTime() +
				getTimezoneOffset('Europe/London', new Date(run.date)) * 1000 * 60
		);
	}
	if (run.country === 'Bulgaria') {
		return new Date(
			new Date(run.date).getTime() +
				getTimezoneOffset('Europe/Sofia', new Date(run.date)) * 1000 * 60
		);
	}
	if (run.country === 'Portugal') {
		return new Date(
			new Date(run.date).getTime() +
				getTimezoneOffset('Europe/Lisbon', new Date(run.date)) * 1000 * 60
		);
	}*/
	return new Date(
		new Date(run.date).getTime() +
			getTimezoneOffset('Europe/Zurich', new Date(run.date)) * 1000 * 60
	);
};

class SingleRun extends React.Component {
	render() {
		const time = this.props.run.date ? getTime(this.props.run) : null;
		return (
			<Row>
				<Time>{this.props.run.day}</Time>
				<DateColumn>
					{format(
						new Date(addDays(new Date('2016-02-18'), this.props.run.day)),
						'dd.MM.YYY'
					)}
				</DateColumn>
				<Day>
					{this.props.run.date
						? format(time, 'h:mmaaaa').replace(/\./g, '')
						: null}
					{this.props.run.date &&
					time.getHours() >= 0 &&
					time.getHours() < 2 ? (
						<Tooltip
							content={
								<div style={{width: 150}}>
									<strong>Run after midnight</strong>
									<br /> According to my rules every day starts and ends at 2am.
								</div>
							}
						>
							<img
								src={infoCircle}
								alt="Info Tooltip"
								style={{height: 14, width: 14, marginLeft: 6}}
							/>
						</Tooltip>
					) : null}
				</Day>
				<Distance>
					{this.props.run.distance
						? (this.props.run.distance / 1000).toFixed(1) + 'km'
						: '?'}
				</Distance>
				<City>
					<Tooltip content={this.props.run.country}>
						<img
							src={getFlag(this.props.run.country)}
							style={{height: 20, marginRight: 5}}
							alt={this.props.run.country}
						/>{' '}
					</Tooltip>
					{this.props.run.city}
				</City>
				<StravaLink>
					{this.props.run.strava_id ? (
						<Tooltip
							content={
								<div style={{width: 110, textAlign: 'center'}}>
									See Run on Strava
								</div>
							}
							placement="top"
						>
							<a
								target="_blank"
								rel="noopener noreferrer"
								href={`https://strava.com/activities/${
									this.props.run.strava_id
								}`}
							>
								<img
									style={{
										height: 24,
										width: 24,
										marginTop: 3
									}}
									src={StravaIcon}
									alt="Strava activity"
								/>
							</a>
						</Tooltip>
					) : null}
				</StravaLink>
				<Treadmill>
					{this.props.run.treadmill ? (
						<Tooltip
							content={
								<div style={{whiteSpace: 'nowrap'}}>
									{this.props.run.treadmill}
								</div>
							}
						>
							<TreadmillIcon />
						</Tooltip>
					) : null}
				</Treadmill>
				<Injury>
					{this.props.run.injured ? (
						<Tooltip
							content={
								<div style={{width: 200}}>
									<strong>Injury:</strong>
									<br />
									{this.props.run.injured}
								</div>
							}
						>
							<InjuryIcon />
						</Tooltip>
					) : null}
				</Injury>
				<Injury>
					{this.props.run.sick ? (
						<Tooltip
							content={
								<div style={{width: 200}}>
									<strong>Sickness:</strong>
									<br />"{this.props.run.sick}"
								</div>
							}
						>
							<SickIcon />
						</Tooltip>
					) : null}
				</Injury>
				<Drunk>
					{this.props.run.drunk ? (
						<Tooltip
							content={
								<div style={{width: 200}}>
									<strong>Alcohol Intake:</strong>
									<br />"{this.props.run.drunk}"
								</div>
							}
						>
							<DrunkIcon />
						</Tooltip>
					) : null}
				</Drunk>
			</Row>
		);
	}
}
export default SingleRun;
