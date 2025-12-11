import React from 'react';
import StatisticCard from './StatisticCard';
import { BsPeopleFill, BsCalendarCheck, BsPersonPlus } from 'react-icons/bs'; // Exemplo de ícones (instale react-icons)

const DashboardStats = () => {
  const purple = '#e0b0d3';
  const green = '#c1f3c1';
  const blue = '#c1e1f3';
  const textPurple = '#6a1b9a';

  return (
    <div className="row">
      <StatisticCard
        title="Total de Pacientes"
        value={3}
        icon={<BsPeopleFill />}
        iconBgColor={purple}
        iconColor={textPurple}
      />
      <StatisticCard
        title="Pacientes Ativos"
        value={3}
        icon={<BsCalendarCheck />}
        iconBgColor={green}
        iconColor="#1b6a1b"
      />
      <StatisticCard
        title="Novos Este Mês"
        value={0}
        icon={<BsPersonPlus />}
        iconBgColor={blue}
        iconColor="#1b6a9a"
      />
    </div>
  );
};

export default DashboardStats;