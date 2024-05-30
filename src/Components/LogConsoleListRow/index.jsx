import React from 'react'
import PropTypes from 'prop-types';

const LogListRow = ({ Log, }) => {
    return (
        <>
            <tr key={Log.log_id} >
                <td>{Log.log_id || '-'}</td>
                <td>{Log.log_date || '-'}</td>
                <td>{Log.db_name || '-'}</td>
                <td>{Log.appl_server || '-'}</td>
                <td>{Log.service_name || '-'}</td>
                <td>{Log.session_id || '-'}</td>
                <td>{Log.user_id || '-'}</td>
                <td>{Log.user_full_name || '-'}</td>
                <td>{Log.ip_address || '-'}</td>
                <td className='truncate'>{Log.user_agent || '-'}</td>
                <td className='truncate'>{Log.message || '-'}</td>
                <td>{Log.generic_schema_id || '-'}</td>
                <td>{Log.ef_module_id || '-'}</td>
                <td>{Log.ef_request_id || '-'}</td>
                <td>{Log.event_start_date || '-'}</td>
                <td>{Log.event_complete_date || '-'}</td>
                <td>{Log.event_elapsed_time || '-'}</td>
                <td>{Log.event_id || '-'}</td>
                <td>{Log.status || '-'}</td>
                <td>{Log.has_error || '-'}</td>
                <td>{Log.error_message || '-'}</td>
            </tr>
        </>
    )
}

LogListRow.propTypes = {
    Log: PropTypes.any
};


export default LogListRow

