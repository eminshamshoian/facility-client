import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Modal } from '../../../reusable/modal/Modal';
import { AddTicketForm } from './AddTicketForm';
import { addModal } from '../../../../redux/actions/modal';

const AddTicket = props => {
    const { add, addModal } = props;
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setVisible(add);
    }, [setVisible, add]);

    const dismiss = () => {
        addModal(false);
    };
    return (
        <>
            <Modal
                header='Add New Ticket'
                visible={visible}
                dismiss={dismiss}
                children={<AddTicketForm addModal={addModal} />}
            />
        </>
    );
};

AddTicket.propTypes = {
    add: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
    add: state.modal.add
});

export default connect(
    mapStateToProps,
    { addModal }
)(AddTicket);
