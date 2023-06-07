import { AuthProvider } from './AuthContext';
import { UserProvider } from './UserContext';
import { CardModalProvider } from './CardModal';

const ContextsProviders = (props) => {
  return (
    <AuthProvider>
      <UserProvider>
        <CardModalProvider>{props.children}</CardModalProvider>
      </UserProvider>
    </AuthProvider>
  );
};

export default ContextsProviders;
