import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import Infinite from 'react-infinite-loading';
import Run, {Header} from './SingleRun';
import Facts from './Facts';
import Loader from './Loader';

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
		return (
			<div style={{textAlign: 'center', marginTop: 100, marginBottom: 100}}>
				<Loader width={16} height={16} />
			</div>
		);
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
