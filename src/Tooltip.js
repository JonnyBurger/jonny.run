import React from 'react';
import ReactSimpleTooltip from 'react-simple-tooltip';

export default props => {
	return (
		<ReactSimpleTooltip
			arrow={5}
			background="#000"
			border="#000"
			color="#fff"
			fadeDuration={0}
			fadeEasing="linear"
			fixed={false}
			fontFamily="Arial"
			fontWeight="300"
			fontSize="12px"
			offset={0}
			padding="7px 9"
			placement="bottom"
			radius={2}
			{...props}
		/>
	);
};
