import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsPencilSquare, BsTrash, BsFileEarmarkText } from 'react-icons/bs';

const PRIMARY_COLOR = '#8c3d7e';

const mockPatients = [
  {
    id: 1,
    nome: 'Ana Silva',
    cpf: '123.456.789-00',
    telefone: '(92) 99123-4567',
    email: 'ana@email.com',
    cidade: 'Parintins/AM',
    cadastro: '14/01/2024',
  },
  {
    id: 2,
    nome: 'Carlos Souza',
    cpf: '234.567.890-11',
    telefone: '(92) 99234-5678',
    email: 'carlos@email.com',
    cidade: 'Parintins/AM',
    cadastro: '19/02/2024',
  },
  {
    id: 3,
    nome: 'Maria Santos',
    cpf: '345.678.901-22',
    telefone: '(92) 99345-6789',
    email: 'maria@email.com',
    cidade: 'Parintins/AM',
    cadastro: '09/03/2024',
  },
];

const TableActionIcon = ({ icon, onClick, color, title }) => (
  <span 
    className="me-2" 
    style={{ cursor: 'pointer', color: color, transition: 'color 0.1s' }}
    onClick={onClick}
    title={title}
  >
    {icon}
  </span>
);

const PatientTable = ({ patients = mockPatients, onEditClick, onDeleteClick }) => {
  const tableHeaderStyle = {
    backgroundColor: PRIMARY_COLOR,
    color: 'white',
    fontSize: '0.95rem',
  };

  return (
    <div className="table-responsive">
      <table className="table table-hover align-middle">
        <thead style={tableHeaderStyle}>
          <tr>
            <th scope="col" className="py-3 px-3 rounded-start">Nome</th>
            <th scope="col" className="py-3 px-3">CPF</th>
            <th scope="col" className="py-3 px-3">Telefone</th>
            <th scope="col" className="py-3 px-3">Email</th>
            <th scope="col" className="py-3 px-3">Cidade</th>
            <th scope="col" className="py-3 px-3">Cadastro</th>
            <th scope="col" className="py-3 px-3 rounded-end text-center">Ações</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr key={patient.id} style={{ fontSize: '0.9rem' }}>
              <td className="px-3">{patient.nome}</td>
              <td className="px-3">{patient.cpf}</td>
              <td className="px-3">{patient.telefone}</td>
              <td className="px-3">{patient.email}</td>
              <td className="px-3">{patient.cidade}</td>
              <td className="px-3">{patient.cadastro}</td>
              <td className="px-3 text-center d-flex justify-content-center">
                <TableActionIcon 
                    icon={<BsPencilSquare />} 
                    onClick={() => onEditClick(patient)} 
                    color= {PRIMARY_COLOR}
                    title="Editar Paciente"
                />
                <TableActionIcon 
                    icon={<BsTrash />} 
                    onClick={() => onDeleteClick(patient)}
                    color="#dc3545" 
                    title="Excluir Paciente"
                />
                <TableActionIcon 
                    icon={<BsFileEarmarkText />} 
                    onClick={() => handleView(patient.id)} 
                    color="#4a4a4a" 
                    title="Visualizar Prontuário"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PatientTable;