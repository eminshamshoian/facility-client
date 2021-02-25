import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { FormInput } from '../../../reusable/FormInput';
import { Button } from '../../../reusable/Button';
import { DropDown } from '../../../reusable/dropdown/DropDown';
import { facilitiesArray, prioritiesArray } from '../../../../helpers/Helpers';
import { editTicket } from '../../../../services/ticket.service';
import { apiEndPoint } from '../../../../Config';

const API_ENDPOINT = apiEndPoint();

const EditTicketForm = props => {
    const socket = socketIOClient(API_ENDPOINT);

    const { editModal, selectedTicket } = props;
    let facilities = facilitiesArray();
    let priorities = prioritiesArray();

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

    const getDropDownValue = item => {
        if (item.key === 'facilities') {
            setFacility(item.title);
        } else {
            setPriority(item.title);
        }
    };

    const onEditTicket = async e => {
        e.preventDefault();
        const { data } = ticket;
        data.priority = priority;
        data.facility = facility;

        await editTicket(selectedTicket._id, data);
        socket.emit('refresh', {});
    };

    const onChange = e => {
        const { name, value } = e.target;
        const { data } = ticket;
        setTicket({
            data: {
                ...data,
                [name]: value
            }
        });
    };

    return (
        <>
            <form onSubmit={onEditTicket}>
                <div className='form-group'>
                    <FormInput
                        type='text'
                        name='fullname'
                        label='Fullname'
                        className='form-control'
                        placeholder='Enter Fullname'
                        value={fullname}
                        error=''
                        onChange={onChange}
                    />
                </div>
                <div className='form-group'>
                    <FormInput
                        type='text'
                        name='email'
                        label='Email'
                        className='form-control'
                        placeholder='Enter Email'
                        value={email}
                        error=''
                        onChange={onChange}
                    />
                </div>
                <div className='form-group'>
                    <DropDown
                        title={facility}
                        label='Facility'
                        list={facilities}
                        getDropDownValue={getDropDownValue}
                    />
                </div>
                <div className='form-group'>
                    <DropDown
                        title={priority}
                        label='Priority'
                        list={priorities}
                        getDropDownValue={getDropDownValue}
                    />
                </div>
                <div className='form-group'>
                    <FormInput
                        type='text'
                        name='subject'
                        label='Subject'
                        className='form-control'
                        placeholder='Enter Subject'
                        value={subject}
                        error=''
                        onChange={onChange}
                    />
                </div>
                <div className='form-group'>
                    <label>Description</label>
                    <textarea
                        className='form-control'
                        name='description'
                        row='5'
                        col='40'
                        value={description}
                        onChange={onChange}
                    ></textarea>
                </div>
                <Button
                    className='btn btn-primary'
                    label='Edit'
                    disabled={
                        !fullname ||
                        !email ||
                        !subject ||
                        !description ||
                        !facility ||
                        !priority
                    }
                />
                &nbsp;&nbsp;&nbsp;
                <Button
                    className='btn btn-danger'
                    label='CANCEL'
                    handleClick={() => editModal(false)}
                />
            </form>
        </>
    );
};

EditTicketForm.propTypes = {
    selectedTicket: PropTypes.object
};

const mapStateToProps = state => ({
    selectedTicket: state.tickets.selectedTicket
});

export default connect(
    mapStateToProps,
    {}
)(EditTicketForm);
