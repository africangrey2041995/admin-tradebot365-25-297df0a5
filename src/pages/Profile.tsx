
import React from 'react';

const ProfilePage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <h1 className="text-3xl font-bold mb-4">User Profile</h1>
      <p className="text-lg text-center max-w-2xl mb-8">
        Manage your profile and account settings.
      </p>
    </div>
  );
};

export default ProfilePage;
