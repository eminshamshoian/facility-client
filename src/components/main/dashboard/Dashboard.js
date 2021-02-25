import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import socketIOClient from 'socket.io-client';

import Card from '../card/Card';
import './Dashboard.css';
import { TableElements } from '../table-elements/TableElements';
import AddTicket from '../tickets/add/AddTicket';
import { AuthToken } from '../../../helpers/AuthToken';
import { allTickets } from '../../../redux/actions/tickets';
import { updateTableEntries } from '../../../redux/actions/tickets';
import { getUser } from '../../../redux/actions/user';
import EditTicket from '../tickets/edit/EditTicket';
import ViewTicket from '../tickets/view/ViewTicket';
import { apiEndPoint } from '../../../Config';

const API_ENDPOINT = apiEndPoint();

const Dashboard = props => {
    const socket = socketIOClient(API_ENDPOINT);

    const { token, allTickets, updateTableEntries, getUser } = props;

    useEffect(() => {
        const dashboardMethods = () => {
            AuthToken(token);
            allTickets();
            updateTableEntries(5);
            getUser();
        };

        dashboardMethods();

        socket.on('refreshPage', () => {
            dashboardMethods();
        });
    }, [token, allTickets, socket, updateTableEntries, getUser]);

    return (
        <>
            <div className='row'>
                <div className='col-12'>
                    <div className='card-box'>
                        <Card />
                        <TableElements />
                        <AddTicket />
                        <EditTicket />
                        <ViewTicket />
                    </div>
                </div>
            </div>
        </>
    );
};

Dashboard.propTypes = {
    token: PropTypes.string,
    allTickets: PropTypes.func.isRequired,
    updateTableEntries: PropTypes.func.isRequired,
    getUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    token: state.auth.token
});

export default connect(
    mapStateToProps,
    { allTickets, updateTableEntries, getUser }
)(Dashboard);
