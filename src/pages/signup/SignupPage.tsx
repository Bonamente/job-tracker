import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import StyledSignupPage from './StyledSignupPage';
import { Logo, Input } from '../../components';

import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { signUpUser, signInUser } from '../../features/user/userThunks';

type InitialState = {
  name: string;
  email: string;
  password: string;
  isMember: boolean;
};

const initialState: InitialState = {
  name: '',
  email: '',
  password: '',
  isMember: true,
};

const SignupPage = () => {
  const { t } = useTranslation();

  const [values, setValues] = useState(initialState);
  const { user, isLoading } = useAppSelector((store) => store.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate('/');
      }, 2000);
    }
  }, [user, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, password, isMember } = values;

    if (!email || !password || (!isMember && !name)) {
      toast.error(t('toasts.all_fields'));
      return;
    }

    if (isMember) {
      dispatch(signInUser({ email, password }));
      return;
    }

    dispatch(signUpUser({ name, email, password }));
  };

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  return (
    <StyledSignupPage className="full-page">
      <form className="form" onSubmit={handleSubmit}>
        <Logo />
        <h1>
          {values.isMember ? t('signupPage.signin') : t('signupPage.signup')}
        </h1>

        {!values.isMember && (
          <Input
            type="text"
            name="name"
            value={values.name}
            handleChange={handleChange}
          />
        )}

        <Input
          type="email"
          name="email"
          value={values.email}
          handleChange={handleChange}
        />

        <Input
          type="password"
          name="password"
          value={values.password}
          handleChange={handleChange}
        />
        <button className="btn btn-block" type="submit" disabled={isLoading}>
          {isLoading
            ? t('buttons.loading')
            : `${values.isMember ? t('buttons.signin') : t('buttons.signup')}`}
        </button>
        <p>
          {values.isMember
            ? t('signupPage.no_account')
            : t('signupPage.has_account')}
          <button className="member-btn" type="button" onClick={toggleMember}>
            {values.isMember ? t('signupPage.signup') : t('signupPage.signin')}
          </button>
        </p>
      </form>
    </StyledSignupPage>
  );
};

export default SignupPage;
