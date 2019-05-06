import React from 'react';
import styled from 'styled-components';
import uniqBy from 'lodash.uniqby';
import getDay from './get-day';

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

export default ({runs}) => (
	<Container>
		<Fact>
			<Title>Days</Title>
			<Num>{runs.length}</Num>
		</Fact>
		<Fact>
			<Title>Did run today yet</Title>
			<Num>{runs.length === getDay(new Date()) ? 'Yes' : 'No'}</Num>
		</Fact>
		<Fact>
			<Title>World Record progress</Title>
			<Num>{((runs.length / 19032) * 100).toFixed(2)}%</Num>
		</Fact>
		<Fact>
			<Title>Countries</Title>
			<Num>{uniqBy(runs.filter(r => r.country), r => r.country).length}</Num>
		</Fact>
	</Container>
);
