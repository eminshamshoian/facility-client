import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import socketIOClient from 'socket.io-client';
import { useHistory, useParams } from 'react-router-dom';
import Paginator from 'react-hooks-paginator';

import _ from 'lodash';

import { selectedTicket } from '../../../../redux/actions/tickets';
import { editModal, viewModal } from '../../../../redux/actions/modal';
import { deleteTicket, closeTicket } from '../../../../services/ticket.service';
import './Table.css';
import { apiEndPoint } from '../../../../Config';

const API_ENDPOINT = apiEndPoint();

const TABLE_HEAD = [
    'ID #',
    'Full Name',
    'Subject',
    'Priority',
    'Status',
    'Created At',
    'Completed At',
    'Action'
];

const FilteredTable = props => {
    const socket = socketIOClient(API_ENDPOINT);

    const { tickets, selectedTicket, editModal, viewModal, user } = props;
    const [tableTickets, setTableTickets] = useState(tickets);
    const [title, setTitle] = useState('');

    // Pagination state
    const [offset, setOffset] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const history = useHistory();
    const { type, status } = useParams();

    const filterTickets = type => {
        if (status === 'all') {
            const tableEntries = tickets.slice(offset, offset + 10);
            setTableTickets(tableEntries);
            setTitle('All Tickets');
        } else if (status === 'priority') {
            const result = _.filter(tickets, ['priority', type]);
            const tableEntries = result.slice(offset, offset + 10);
            setTableTickets(tableEntries);
            setTitle(`${type} Priority Tickets`);
        } else {
            const result = _.filter(tickets, ['status', type]);
            const tableEntries = result.slice(offset, offset + 10);
            setTableTickets(tableEntries);
            setTitle(`${type} Tickets`);
        }
    };

    useEffect(() => {
        filterTickets(type);

        // eslint-disable-next-line
    }, [tickets, offset, setTableTickets]);

    const openEditModal = ticket => {
        editModal(true);
        selectedTicket(ticket);
        socket.emit('refresh', {});
    };

    const openViewModal = ticket => {
        viewModal(true);
        selectedTicket(ticket);
        socket.emit('refresh', {});
    };

    const deleteUserTicket = id => {
        deleteTicket(id);
        socket.emit('refresh', {});
    };

    const markUserTicket = id => {
        closeTicket(id);
        socket.emit('refresh', {});
    };

    const goBackToDashboard = () => {
        history.push('/dashboard');
    };

    return (
        <>
            <div className='row'>
                <dir className='col-sm-5'>
                    <div onClick={() => goBackToDashboard()}>
                        <i className='fas fa-arrow-left back'></i>
                    </div>
                </dir>
                <div className='col-sm-5 title'>
                    <h3 className='text-dark'>{title}</h3>
                </div>
            </div>
            <div className='table-responsive'>
                <table className='table table-centered mb-0' id='ticketTable'>
                    <thead className='font-14 bg-light'>
                        <tr>
                            {TABLE_HEAD.map((tableHead, i) => (
                                <th key={i} className='font-weight-medium'>
                                    {tableHead} &nbsp;&nbsp;
                                    <i className='fas fa-angle-up icon'></i>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className='font-14'>
                        {tableTickets.map(ticket => (
                            <tr key={ticket._id}>
                                <td
                                    className={
                                        user && user._id === ticket.user
                                            ? 'font-weight-bold'
                                            : 'text-dark'
                                    }
                                >
                                    #{ticket.ticketId}
                                </td>
                                <td
                                    className={
                                        user && user._id === ticket.user
                                            ? 'font-weight-bold'
                                            : 'text-dark'
                                    }
                                >
                                    {ticket.fullname}
                                </td>
                                <td
                                    className={
                                        user && user._id === ticket.user
                                            ? 'font-weight-bold'
                                            : 'text-dark'
                                    }
                                >
                                    {ticket.subject}
                                </td>
                                <td>
                                    {ticket.priority === 'High' ? (
                                        <span className='badge badge-danger'>
                                            {ticket.priority}
                                        </span>
                                    ) : ticket.priority === 'Medium' ? (
                                        <span className='badge badge-warning'>
                                            {ticket.priority}
                                        </span>
                                    ) : (
                                        <span className='badge badge-secondary'>
                                            {ticket.priority}
                                        </span>
                                    )}
                                </td>
                                <td>
                                    {ticket.status === 'Open' ? (
                                        <span className='badge badge-success'>
                                            {ticket.status}
                                        </span>
                                    ) : (
                                        <span className='badge badge-secondary'>
                                            {ticket.status}
                                        </span>
                                    )}
                                </td>
                                <td
                                    className={
                                        user && user._id === ticket.user
                                            ? 'font-weight-bold'
                                            : 'text-dark'
                                    }
                                >
                                    {moment(ticket.created).format(
                                        'MM/DD/YYYY'
                                    )}
                                    <div className='sub-text-color'>
                                        {moment(ticket.created).format(
                                            'h:mm:ss a'
                                        )}
                                    </div>
                                </td>
                                {ticket.status === 'Closed' ? (
                                    <td
                                        className={
                                            user && user._id === ticket.user
                                                ? 'font-weight-bold'
                                                : 'text-dark'
                                        }
                                    >
                                        {moment(ticket.dueDate).format(
                                            'MM/DD/YYYY'
                                        )}
                                        <div className='sub-text-color'>
                                            {moment(ticket.dueDate).format(
                                                'h:mm:ss a'
                                            )}
                                        </div>
                                    </td>
                                ) : (
                                    <td
                                        className={
                                            user && user._id === ticket.user
                                                ? 'font-weight-bold'
                                                : 'text-dark'
                                        }
                                    >
                                        <p>Not Complete</p>
                                    </td>
                                )}

                                <td>
                                    {user && user._id === ticket.user ? (
                                        <>
                                            <a
                                                href='#!'
                                                className='btn table-button btn-sm'
                                                onClick={() => {
                                                    deleteUserTicket(
                                                        ticket._id
                                                    );
                                                }}
                                            >
                                                <i className='fas fa-trash'></i>
                                            </a>
                                            <a
                                                href='#!'
                                                className={
                                                    ticket.status === 'Closed'
                                                        ? 'btn table-button btn-sm disabled'
                                                        : 'btn table-button btn-sm'
                                                }
                                                onClick={() => {
                                                    markUserTicket(ticket._id);
                                                }}
                                            >
                                                <i className='fas fa-check'></i>
                                            </a>
                                            <a
                                                href='#!'
                                                className={
                                                    ticket.status === 'Closed'
                                                        ? 'btn table-button btn-sm disabled'
                                                        : 'btn table-button btn-sm'
                                                }
                                                onClick={() => {
                                                    goBackToDashboard();
                                                    openEditModal(ticket);
                                                }}
                                            >
                                                <i className='fas fa-pencil-alt'></i>
                                            </a>
                                            <a
                                                href='#!'
                                                className='btn table-button btn-sm'
                                                onClick={() => {
                                                    goBackToDashboard();
                                                    openViewModal(ticket);
                                                }}
                                            >
                                                <i className='fas fa-eye'></i>
                                            </a>
                                        </>
                                    ) : user && user.role === 'Admin' ? (
                                        <>
                                            <a
                                                href='#!'
                                                className='btn table-button btn-sm'
                                                onClick={() => {
                                                    deleteUserTicket(
                                                        ticket._id
                                                    );
                                                }}
                                            >
                                                <i className='fas fa-trash'></i>
                                            </a>
                                            <a
                                                href='#!'
                                                className={
                                                    ticket.status === 'Closed'
                                                        ? 'btn table-button btn-sm disabled'
                                                        : 'btn table-button btn-sm'
                                                }
                                                onClick={() => {
                                                    markUserTicket(ticket._id);
                                                }}
                                            >
                                                <i className='fas fa-check'></i>
                                            </a>
                                            <a
                                                href='#!'
                                                className={
                                                    ticket.status === 'Closed'
                                                        ? 'btn table-button btn-sm disabled'
                                                        : 'btn table-button btn-sm'
                                                }
                                                onClick={() => {
                                                    goBackToDashboard();
                                                    openEditModal(ticket);
                                                }}
                                            >
                                                <i className='fas fa-pencil-alt'></i>
                                            </a>
                                            <a
                                                href='#!'
                                                className='btn table-button btn-sm'
                                                onClick={() => {
                                                    goBackToDashboard();
                                                    openViewModal(ticket);
                                                }}
                                            >
                                                <i className='fas fa-eye'></i>
                                            </a>
                                        </>
                                    ) : (
                                        <>
                                            <a
                                                href='#!'
                                                className='btn table-button btn-sm disabled'
                                            >
                                                <i className='fas fa-trash'></i>
                                            </a>
                                            <a
                                                href='#!'
                                                className='btn table-button btn-sm disabled'
                                            >
                                                <i className='fas fa-check'></i>
                                            </a>
                                            <a
                                                href='#!'
                                                className='btn table-button btn-sm disabled'
                                            >
                                                <i className='fas fa-pencil-alt'></i>
                                            </a>
                                            <a
                                                href='#!'
                                                className='btn table-button btn-sm disabled'
                                            >
                                                <i className='fas fa-eye'></i>
                                            </a>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Paginator
                    totalRecords={tickets.length}
                    pageLimit={10}
                    pageNeighbours={0}
                    setOffset={setOffset}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            </div>
        </>
    );
};

FilteredTable.propTypes = {
    tickets: PropTypes.array.isRequired,
    entries: PropTypes.any,
    editModal: PropTypes.func.isRequired,
    viewModal: PropTypes.func.isRequired,
    selectedTicket: PropTypes.func.isRequired,
    user: PropTypes.object
};

const mapStateToProps = state => ({
    tickets: state.tickets.tickets,
    entries: state.tickets.entries,
    user: state.user
});

export default connect(
    mapStateToProps,
    { editModal, viewModal, selectedTicket }
)(FilteredTable);
