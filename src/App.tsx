import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider } from 'styled-components';

import MainPage from './pages/main/MainPage';
import SignupPage from './pages/signup/SignupPage';
import NotFoundPage from './pages/not-found/NotFoundPage';
import ProtectedRoute from './pages/protected-route/ProtectedRoute';
import {
  AddJob,
  AllJobs,
  Profile,
  Stats,
  SharedLayout,
} from './pages/dashboard';

import { lightTheme, darkTheme } from './themes';
import GlobalStyles from './styles/GlobalStyles';
import useDarkMode from './hooks/useDarkMode';

const App = () => {
  const { theme, switchTheme, isMounted } = useDarkMode();
  const themeMode = theme === 'light' ? lightTheme : darkTheme;

  if (!isMounted) return <div />;

  return (
    <ThemeProvider theme={themeMode}>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <SharedLayout switchTheme={switchTheme} />
              </ProtectedRoute>
            }
          >
            <Route index element={<Stats />} />
            <Route path="all-jobs" element={<AllJobs />} />
            <Route path="add-job" element={<AddJob />} />
            <Route path="profile" element={<Profile />} />
          </Route>
          <Route path="main" element={<MainPage switchTheme={switchTheme} />} />
          <Route path="signup" element={<SignupPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <ToastContainer position="top-center" />
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
