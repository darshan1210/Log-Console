import React from 'react';
import PropTypes from 'prop-types';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

function ToolTip({ children, text }) {
    return (
        <OverlayTrigger
            key="top"
            placement="top"
            overlay={
                <Tooltip id={text}>
                    {text}
                </Tooltip>
            }
        >
            {children}
        </OverlayTrigger>
    );
}

ToolTip.propTypes = {
    children: PropTypes.node.isRequired,
    text: PropTypes.string.isRequired
};

export default ToolTip;
