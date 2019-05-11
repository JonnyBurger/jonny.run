import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {useMedia} from 'react-use-media';
import Infinite from 'react-infinite-loading';
import Run, {Header} from './SingleRun';
import Facts from './Facts';

const Container = styled.div`
	max-width: 900px;
	margin: auto;
	display: flex;
	flex-direction: column;
`;

const getRuns = (offset: number = 0) =>
	fetch(
		process.env.NODE_ENV === 'production'
			? `https://api.jonny.run/.netlify/functions/index?offset=${offset}`
			: `http://localhost:1200?offset=${offset}`
	).then(response => response.json());

const Runs = ({width, height}) => {
	const [loading, setLoading] = useState(true);
	const [loadingMore, setLoadingMore] = useState(false);
	const [data, setData] = useState(null);
	const [total, setTotal] = useState(null);
	const isMobile = useMedia('(max-width: 800px)');
	useEffect(() => {
		getRuns(0)
			.then(response => {
				setData(response.runs);
				setLoading(false);
				setTotal(response.total);
			})
			.catch(err => {
				alert(`Could not load runs: ${err.message}`);
			});
	}, []);

	if (loading) {
		return 'Loading...';
	}

	return (
		<Container>
			<Facts total={total} runs={data} />
			<Header />

			<Infinite
				handleLoading={() => {
					setLoadingMore(true);
					getRuns(data.length).then(response => {
						setData([...data, ...response.runs]);
						setLoadingMore(false);
					});
				}}
				loading={loadingMore}
			>
				{data
					? data.map((run, i) => (
							<Run isToday={i === 0} key={run.day} run={run} />
					  ))
					: null}
			</Infinite>
		</Container>
	);
};

export default Runs;
