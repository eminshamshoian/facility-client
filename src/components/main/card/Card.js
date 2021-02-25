import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { Box } from './Box';
import { Button } from '../../reusable/Button';
import './Card.css';
import { addModal } from '../../../redux/actions/modal';

const Card = props => {
    const { addModal, tickets } = props;

    const findByStatus = value => {
        return _.filter(tickets, ['status', value]).length;
    };

    const findByPriority = value => {
        return _.filter(tickets, ['priority', value]).length;
    };

    return (
        <div>
            <div className='text-center mb-2'>
                <h2 className='text-center px-2'>Statistics</h2>
                <hr />
                <div className='row'>
                    <Box
                        title='Total tickets'
                        cardValue={tickets.length}
                        iconClass='fas fa-tags'
                        type='total'
                        status='all'
                    />
                    <Box
                        title='Open tickets'
                        cardValue={findByStatus('Open')}
                        iconClass='fas fa-envelope-open-text'
                        cardValueClass='text-success'
                        type='Open'
                        status='Status'
                    />
                    <Box
                        title='Closed tickets'
                        cardValue={findByStatus('Closed')}
                        iconClass='fas fa-times'
                        cardValueClass='text-muted'
                        type='Closed'
                        status='Status'
                    />
                    <Box
                        title='High Priority tickets'
                        cardValue={findByPriority('High')}
                        iconClass='fas fa-thermometer-full'
                        cardValueClass='text-danger'
                        type='High'
                        status='priority'
                    />
                    <Box
                        title='Medium Priority tickets'
                        cardValue={findByPriority('Medium')}
                        iconClass='fas fa-thermometer-half'
                        cardValueClass='text-warning'
                        type='Medium'
                        status='priority'
                    />
                    <Box
                        title='Low Priority tickets'
                        cardValue={findByPriority('Low')}
                        iconClass='fas fa-thermometer-empty'
                        cardValueClass='text-muted'
                        type='Low'
                        status='priority'
                    />
                </div>
            </div>
            <h2 className='text-center px-2'>Tools</h2>
            <hr />
            <Button
                type='submit'
                label='Create Ticket'
                className='btn btn-primary btn-add'
                handleClick={() => addModal(true)}
            />
            <Button
                type='submit'
                label='Download CSV'
                className='btn btn-primary btn-add mx-3'
                handleClick={() => addModal(true)}
            />
        </div>
    );
};

Card.propTypes = {
    tickets: PropTypes.array.isRequired,
    addModal: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    tickets: state.tickets.tickets
});

export default connect(
    mapStateToProps,
    { addModal }
)(Card);
