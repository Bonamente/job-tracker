import { useState } from 'react';
import { toast } from 'react-toastify';

import { Input } from '../../../components';
import StyledDashboardForm from '../../../styles/StyledDashboardForm';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { updateUser } from '../../../features/user/userThunks';

const Profile = () => {
  const { isLoading, user } = useAppSelector((store) => store.user);
  const dispatch = useAppDispatch();

  const [userData, setUserData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    lastName: user?.lastName || '',
    location: user?.location || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, lastName, location } = userData;

    if (!name || !email || !lastName || !location) {
      toast.error('please fill out all fields');
      return;
    }

    dispatch(updateUser(userData));
  };

  return (
    <StyledDashboardForm>
      <form className="form" onSubmit={handleSubmit}>
        <h2>profile</h2>
        <div className="form-center">
          <Input
            type="text"
            name="name"
            value={userData.name}
            handleChange={handleChange}
          />
          <Input
            type="text"
            labelText="last name"
            name="lastName"
            value={userData.lastName}
            handleChange={handleChange}
          />
          <Input
            type="email"
            name="email"
            value={userData.email}
            handleChange={handleChange}
          />
          <Input
            type="text"
            name="location"
            value={userData.location}
            handleChange={handleChange}
          />
          <button className="btn btn-block" type="submit" disabled={isLoading}>
            {isLoading ? 'please wait...' : 'save changes'}
          </button>
        </div>
      </form>
    </StyledDashboardForm>
  );
};

export default Profile;
