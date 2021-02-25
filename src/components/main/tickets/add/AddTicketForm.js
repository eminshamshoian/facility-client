import React, { useState } from 'react';
import socketIOClient from 'socket.io-client';

import { FormInput } from '../../../reusable/FormInput';
import { Button } from '../../../reusable/Button';
import { DropDown } from '../../../reusable/dropdown/DropDown';
import { facilitiesArray, prioritiesArray } from '../../../../helpers/Helpers';
import { addNewTicket } from '../../../../services/ticket.service';
import { apiEndPoint } from '../../../../Config';

const API_ENDPOINT = apiEndPoint();

const AddTicketForm = props => {
    const socket = socketIOClient(API_ENDPOINT);

    const { addModal } = props;
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

    const getDropDownValue = item => {
        if (item.key === 'facilities') {
            setFacility(item.title);
        } else {
            setPriority(item.title);
        }
    };

    const onAddTicket = async e => {
        e.preventDefault();
        const { data } = ticket;
        data.priority = priority;
        data.facility = facility;

        await addNewTicket(data);
        socket.emit('refresh', {});
        clearFormFields();
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

    const clearFormFields = () => {
        setTicket({
            data: {
                fullname: '',
                email: '',
                subject: '',
                description: '',
                facility: '',
                priority: ''
            }
        });
        setFacility('Select Facility');
        setPriority('Choose Priority');
    };

    return (
        <>
            <form onSubmit={onAddTicket}>
                <div className='form-group'>
                    <FormInput
                        type='text'
                        name='fullname'
                        label='Full Name'
                        className='form-control'
                        placeholder='Enter Full Name'
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
                    className='btn modal-submit-button'
                    label='ADD'
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
                    handleClick={() => addModal(false)}
                />
            </form>
        </>
    );
};

export { AddTicketForm };
