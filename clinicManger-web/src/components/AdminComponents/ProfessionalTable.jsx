import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsPencilSquare, BsTrash } from 'react-icons/bs';

const PRIMARY_COLOR = '#8c3d7e';

const mockProfessionals = [
  {
    id: 1,
    nome: 'Dra. Paula Costa',
    especialidade: 'Odontologia - Clínica Geral',
    registro: 'CRO-AM 12345',
    telefone: '(92) 99111-2222',
    email: 'paula.costa@clinicmanager.com',
    horario: '08:00 - 18:00',
  },
  {
    id: 2,
    nome: 'Dr. Carlos Mendes',
    especialidade: 'Odontologia - Ortodontia',
    registro: 'CRO-AM 23456',
    telefone: '(92) 99222-3333',
    email: 'carlos.mendes@clinicmanager.com',
    horario: '09:00 - 17:00',
  },
  {
    id: 3,
    nome: 'Dra. Ana Souza',
    especialidade: 'Medicina - Clínica Geral',
    registro: 'CRM-AM 34567',
    telefone: '(92) 99333-4444',
    email: 'ana.souza@clinicmanager.com',
    horario: '08:00 - 14:00',
  },
];

const TableActionIcon = ({ icon, onClick, color }) => (
  <span 
    className="me-2" 
    style={{ cursor: 'pointer', color: color, transition: 'color 0.1s' }}
    onClick={onClick}
  >
    {icon}
  </span>
);

const ProfessionalTable = ({ professionals = mockProfessionals }) => {
  const tableHeaderStyle = {
    backgroundColor: PRIMARY_COLOR,
    color: 'white',
    fontSize: '0.95rem',
  };

  const handleEdit = (id) => console.log(`Editar profissional: ${id}`);
  const handleDelete = (id) => console.log(`Excluir profissional: ${id}`);

  return (
    <div className="table-responsive">
      <table className="table table-hover align-middle">
        <thead style={tableHeaderStyle}>
          <tr>
            <th scope="col" className="py-3 px-3 rounded-start">Nome</th>
            <th scope="col" className="py-3 px-3">Especialidade</th>
            <th scope="col" className="py-3 px-3">CRM/CRO</th>
            <th scope="col" className="py-3 px-3">Telefone</th>
            <th scope="col" className="py-3 px-3">Email</th>
            <th scope="col" className="py-3 px-3">Horário</th>
            <th scope="col" className="py-3 px-3 rounded-end text-center">Ações</th>
          </tr>
        </thead>
        <tbody>
          {professionals.map((prof) => (
            <tr key={prof.id} style={{ fontSize: '0.9rem' }}>
              <td className="px-3">{prof.nome}</td>
              <td className="px-3">{prof.especialidade}</td>
              <td className="px-3">{prof.registro}</td>
              <td className="px-3">{prof.telefone}</td>
              <td className="px-3">{prof.email}</td>
              <td className="px-3">{prof.horario}</td>
              <td className="px-3 text-center">
                <TableActionIcon 
                    icon={<BsPencilSquare />} 
                    onClick={() => handleEdit(prof.id)} 
                    color= {PRIMARY_COLOR} 
                />
                <TableActionIcon 
                    icon={<BsTrash />} 
                    onClick={() => handleDelete(prof.id)} 
                    color="#dc3545"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProfessionalTable;