import React from 'react';
import styled from 'styled-components';

const SectionTitle = styled.h2`
	font-family: 'Roboto Condensed';
	border-bottom: 1px solid #333;
`;

const Faq = styled.div`
	text-align: left;
	max-width: 900px;
`;

export default () => (
	<Faq>
		<SectionTitle>Challenge FAQ</SectionTitle>
		<h3>What are the rules?</h3>
		<p>
			I must <span style={{borderBottom: '1px solid'}}>run every day</span>. A
			day begins and ends at 2am in the morning. The timezone in which I run
			counts. The minimum distance is 2.5km (about 13 minutes).
		</p>
		<h3>Why are you doing it?</h3>
		<p>
			I felt very un-fit at the beginning of 2016, so I set out to run
			regularly. After I had accumulated a few days I did not want to break the
			streak and then I never stopped. Now I cannot stop because it would be
			devastating.
		</p>
		<h3>
			What if it is really warm or cold or you are in holidays or you are
			injured or you are sick or you have no time?
		</h3>
		<p>
			<em>#RunEveryDayAnyWay</em>
		</p>
		<h3>Skip the day?</h3>
		<p>No way.</p>
	</Faq>
);
