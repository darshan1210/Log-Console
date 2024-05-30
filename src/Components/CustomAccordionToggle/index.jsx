import React from "react";
import PropTypes from 'prop-types';
import { CircleMinusIcon, CirclePlusIcon } from "../../Assets/SVGs";
const { useAccordionButton } = require("react-bootstrap");

function CustomToggle({ children, eventKey, setAccordionToggle, accordionToggle }) {
    const decoratedOnClick = useAccordionButton(eventKey, () =>
        setAccordionToggle(!accordionToggle)
    );

    return (
        <div className="CustomAccordionToggle">
            <span>
                {children}
            </span>
            <span onClick={() => decoratedOnClick()}>
                {accordionToggle ? <CircleMinusIcon /> : <CirclePlusIcon />}
            </span>
        </div>
    );
}

CustomToggle.propTypes = {
    children: PropTypes.node.isRequired,
    eventKey: PropTypes.string.isRequired,
    accordionToggle: PropTypes.bool.isRequired,
    setAccordionToggle: PropTypes.func.isRequired
};

export default CustomToggle