import React from 'react'
import PropTypes from 'prop-types'
import { ModalWrapper, ModalBody, CloseButton } from './Modal.styles'
const Modal = props => {
  function closeModal(e) {
    e.stopPropagation()
    props.onClose()
  }

  return (
    <ModalWrapper onClick={closeModal}>
      <ModalBody onClick={e => e.stopPropagation()}>
        <CloseButton>
          <i className="fas fa-close"></i>
        </CloseButton>
      </ModalBody>
    </ModalWrapper>
  )
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node,
}

export default Modal
