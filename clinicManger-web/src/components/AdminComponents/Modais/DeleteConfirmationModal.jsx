import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsExclamationTriangleFill } from 'react-icons/bs';

const PRIMARY_COLOR = '#8c3d7e';

/**
 * Modal de confirmação de exclusão genérico.
 * @param {boolean} show - Se o modal está visível.
 * @param {function} handleClose - Função para fechar o modal.
 * @param {function} handleConfirm - Função a ser chamada ao confirmar a exclusão.
 * @param {string} entityName - Nome da entidade (ex: Paciente, Profissional).
 * @param {string} itemName - Nome do item a ser excluído (ex: Ana Silva, Dra. Paula Costa).
 */
const DeleteConfirmationModal = ({ show, handleClose, handleConfirm, entityName, itemName }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header 
        closeButton
        style={{ borderBottom: 'none' }} 
      >
        <Modal.Title className="fw-bold d-flex align-items-center">
            <BsExclamationTriangleFill color="#ffc107" className="me-2" style={{ fontSize: '1.5rem' }} />
            Confirmação de Exclusão
        </Modal.Title>
      </Modal.Header>
      
      <Modal.Body className="py-4">
        <p>
          Você tem certeza que deseja excluir o(a) {entityName} {itemName}?
        </p>
        <p className="text-danger fw-bold">
          Esta ação é irreversível.
        </p>
      </Modal.Body>
      
      <Modal.Footer className="border-top-0 d-flex justify-content-end">
        <Button 
          variant="light" 
          className="text-dark fw-bold px-4 py-2"
          onClick={handleClose}
          style={{ backgroundColor: '#e9ecef', borderColor: '#e9ecef' }}
        >
          Cancelar
        </Button>

        <Button 
          variant="danger" 
          type="button" 
          className="fw-bold px-4 py-2 text-white"
          onClick={handleConfirm}
        >
          Excluir
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteConfirmationModal;