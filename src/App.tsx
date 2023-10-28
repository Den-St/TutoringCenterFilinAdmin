import { RoutesSwitch } from "./consts/routes";
import { Layout } from "./container/Layout";
import { AuthProvider } from "./providers/authProvider";

function App() {
  return <AuthProvider>
    <Layout>
      <RoutesSwitch/>
    </Layout>
  </AuthProvider>
}

export default App;
