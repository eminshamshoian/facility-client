import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Modal } from '../../../reusable/modal/Modal';
import EditTicketForm from './EditTicketForm';
import { editModal } from '../../../../redux/actions/modal';

const EditTicket = props => {
    const { edit, editModal } = props;
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setVisible(edit);
    }, [setVisible, edit]);

    const dismiss = () => {
        editModal(false);
    };
    return (
        <>
            <Modal
                header='Edit Ticket'
                visible={visible}
                dismiss={dismiss}
                children={<EditTicketForm editModal={editModal} />}
            />
        </>
    );
};

EditTicket.propTypes = {
    edit: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
    edit: state.modal.edit
});

export default connect(
    mapStateToProps,
    { editModal }
)(EditTicket);
