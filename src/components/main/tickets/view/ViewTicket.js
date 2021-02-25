import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Modal } from '../../../reusable/modal/Modal';
import ViewTicketForm from './ViewTicketForm';
import { viewModal } from '../../../../redux/actions/modal';

const ViewTicket = props => {
    const { view, viewModal } = props;
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setVisible(view);
    }, [setVisible, view]);

    const dismiss = () => {
        viewModal(false);
    };
    return (
        <>
            <Modal
                header='View Ticket'
                visible={visible}
                dismiss={dismiss}
                children={<ViewTicketForm viewModal={viewModal} />}
            />
        </>
    );
};

ViewTicket.propTypes = {
    view: PropTypes.bool
};

const mapStateToProps = state => ({
    view: state.modal.view
});

export default connect(
    mapStateToProps,
    { viewModal }
)(ViewTicket);
