import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {FixedSizeList} from 'react-window';
import {useMedia} from 'react-use-media';
import InfiniteLoader from 'react-window-infinite-loader';
import Run from './SingleRun';
import Facts from './Facts';

const Container = styled.div`
	max-width: 900px;
	margin: auto;
`;

const getRuns = (offset: number = 0) =>
	fetch(
		process.env.NODE_ENV === 'production'
			? `https://api.jonny.run/.netlify/functions/index?offset=${offset}`
			: `http://localhost:1200?offset=${offset}`
	).then(response => response.json());

const Runs = ({width, height}) => {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState(null);
	const [total, setTotal] = useState(null);
	const isMobile = useMedia('(max-width: 800px)');
	useEffect(() => {
		getRuns(0)
			.then(response => {
				setLoading(false);
				setData(response.runs);
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
			{/**
		<Facts total={this.state.total} runs={this.state.data} />
		 */}
			<InfiniteLoader
				itemCount={total}
				isItemLoaded={index => Boolean(data[index])}
				loadMoreItems={offset => {
					return getRuns(offset).then(response => {
						setData([...data, ...response.runs]);
					});
				}}
				minimumBatchSize={100}
				threshold={40}
			>
				{({ref, onItemsRendered}) => (
					<FixedSizeList
						overscanCount={40}
						width={width}
						height={height}
						itemCount={total}
						itemSize={isMobile ? 100 : 50}
						onItemsRendered={onItemsRendered}
						ref={ref}
					>
						{({index, style}) => (
							<div
								style={{...style, display: 'flex', justifyContent: 'center'}}
							>
								{data[index] ? <Run run={data[index]} /> : null}
							</div>
						)}
					</FixedSizeList>
				)}
			</InfiniteLoader>
		</Container>
	);
};

export default Runs;
