import React from 'react'
import PropTypes from 'prop-types'
import { ModalWrapper, ModalBody, CloseButton } from './Modal.styles'
const Modal = props => {
  const { show, children, onClose } = props

  function closeModal(e) {
    e.stopPropagation()
    onClose()
  }

  if (!show) return null

  return (
    <ModalWrapper onClick={closeModal}>
      <ModalBody onClick={e => e.stopPropagation()}>
        <CloseButton onClick={onClose}>
          <i className="fas fa-times"></i>
        </CloseButton>
        {children}
      </ModalBody>
    </ModalWrapper>
  )
}

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node,
}

export default Modal
