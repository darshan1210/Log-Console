import React from 'react'
import PropTypes from 'prop-types';
import ToolTip from '../Tooltip';

const LogListRow = ({ Log }) => {
    return (
        <>
            <tr key={Log.log_id} >
                <td>{Log.log_id || '-'}</td>
                <td>{Log.log_date || '-'}</td>
                <td>{Log.session_id || '-'}</td>
                <td>{Log.user_id || '-'}</td>
                <td>{Log.user_full_name || '-'}</td>
                <ToolTip text={Log.message}><td className='truncate'>{Log.message || '-'}</td></ToolTip>
                <td>{Log.ef_module_id || '-'}</td>
                <td>{Log.ef_request_id || '-'}</td>
                <td>{Log.appl_server || '-'}</td>
                <td>{Log.service_name || '-'}</td>
                <td>{Log.ip_address || '-'}</td>
                <ToolTip text={Log.user_agent}><td className='truncate'>{Log.user_agent || '-'}</td></ToolTip>
            </tr>
        </>
    )
}

LogListRow.propTypes = {
    Log: PropTypes.object
};


export default LogListRow

