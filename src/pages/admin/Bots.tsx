
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminBots = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to premium bots page as the default view
    navigate('/admin/premium-bots');
  }, [navigate]);

  // This component won't actually render anything - just redirects
  return null;
};

export default AdminBots;
