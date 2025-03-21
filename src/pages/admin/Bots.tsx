
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminBots = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // The default admin bots view redirects to the user bots page
    navigate('/admin/user-bots');
  }, [navigate]);

  // This component won't actually render anything - just redirects
  return null;
};

export default AdminBots;
