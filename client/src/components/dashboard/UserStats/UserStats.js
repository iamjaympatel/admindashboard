import React from 'react';
import StatsCard from '../card/StatsCard';
import UserStatsStyled from './UserStatsStyled';
function UserStats({ loading, users }) {


  const colors = ['#4e73df', '#1cc88a', '#36b9cc', '#f6c23e'];
  const icons = [
    <i class="fas fa-users"></i>,
    <i class="fas fa-user-check"></i>,
    <i class="fas fa-users-cog"></i>,
    <i class="fas fa-user-times"></i>
  ];
  return (
    <UserStatsStyled>
      {users.map((item, key) => (
        <StatsCard
          loading={loading}
          stats={item}
          color={colors[key]}
          icon={icons[key]}
          key={key}
        />
      ))}
    </UserStatsStyled>
  );
}

export default UserStats;
