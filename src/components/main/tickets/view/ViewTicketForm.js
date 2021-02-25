import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Button } from '../../../reusable/Button';

const ViewTicketForm = props => {
    const { viewModal, selectedTicket } = props;

    const [facility, setFacility] = useState('Select Facility');
    const [priority, setPriority] = useState('Choose Priority');
    const [ticket, setTicket] = useState({
        data: {
            fullname: '',
            email: '',
            subject: '',
            description: '',
            facility: '',
            priority: ''
        }
    });

    const { fullname, email, subject, description } = ticket.data;

    useEffect(() => {
        if (selectedTicket) {
            setTicket({
                data: {
                    fullname: selectedTicket.fullname,
                    email: selectedTicket.email,
                    subject: selectedTicket.subject,
                    description: selectedTicket.description,
                    facility: selectedTicket.facility,
                    priority: selectedTicket.priority
                }
            });
            setFacility(selectedTicket.facility);
            setPriority(selectedTicket.priority);
        }
    }, [selectedTicket]);

    return (
        <>
            <div className='view-ticket mb-1'>
                <p className='primary-color font-weight-bold mb-1'>
                    Submited By:
                </p>
                <p>{fullname}</p>
            </div>
            <div className='view-ticket mb-1'>
                <p className='primary-color font-weight-bold mb-1'>Email:</p>
                <p>{email}</p>
            </div>
            <div className='view-ticket mb-1'>
                <p className='primary-color font-weight-bold mb-1'>Facility:</p>
                <p>{facility}</p>
            </div>
            <div className='view-ticket mb-1'>
                <p className='primary-color font-weight-bold mb-1'>Priority:</p>
                <p>{priority}</p>
            </div>
            <div className='view-ticket mb-1'>
                <p className='primary-color font-weight-bold mb-1'>Subject:</p>
                <p>{subject}</p>
            </div>
            <div className='view-ticket mb-1'>
                <p className='primary-color font-weight-bold mb-1'>
                    Description:
                </p>
                <p>{description}</p>
            </div>
            <Button
                className='btn btn-danger'
                label='Close'
                handleClick={() => viewModal(false)}
            />
        </>
    );
};

ViewTicketForm.propTypes = {
    selectedTicket: PropTypes.object
};

const mapStateToProps = state => ({
    selectedTicket: state.tickets.selectedTicket
});

export default connect(
    mapStateToProps,
    {}
)(ViewTicketForm);
