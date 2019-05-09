import React from 'react';
import styled from 'styled-components';
import {FixedSizeList} from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import {StickyContainer, Sticky} from 'react-sticky';
import Run, {Header} from './SingleRun';
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

class Runs extends React.Component {
	state = {
		loading: true
	};
	componentDidMount() {
		getRuns(0)
			.then(response => {
				this.setState({
					loading: false,
					data: response.runs,
					total: response.total
				});
			})
			.catch(err => {
				alert(`Could not load runs: ${err.message}`);
			});
	}
	render() {
		if (this.state.loading) {
			return 'Loading...';
		}
		return (
			<StickyContainer>
				<Container>
					<Facts total={this.state.total} runs={this.state.data} />
					<div style={{height: 80}} />
					<Sticky>
						{({style, isSticky}) => (
							<div style={{...style, ...(isSticky ? {zIndex: 2} : {})}}>
								<Header />
							</div>
						)}
					</Sticky>
					<InfiniteLoader
						itemCount={this.state.total}
						isItemLoaded={index => Boolean(this.state.data[index])}
						loadMoreItems={offset => {
							return getRuns(offset).then(response => {
								this.setState({
									data: [...this.state.data, ...response.runs]
								});
							});
						}}
						minimumBatchSize={100}
						threshold={40}
					>
						{({ref, onItemsRendered}) => (
							<FixedSizeList
								overscanCount={40}
								height={1000}
								itemCount={this.state.total}
								itemSize={50}
								onItemsRendered={onItemsRendered}
								ref={ref}
							>
								{({index, style}) => (
									<div style={style}>
										{this.state.data[index] ? (
											<Run run={this.state.data[index]} />
										) : null}
									</div>
								)}
							</FixedSizeList>
						)}
					</InfiniteLoader>
					<div style={{height: 30}} />
				</Container>
			</StickyContainer>
		);
	}
}

export default Runs;
