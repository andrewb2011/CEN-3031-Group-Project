import AppRoutes from "./config/AppRoutes";
import NavBar from "./layouts/NavBar";
import PageContainer from "./layouts/PageContainer";
import Footer from "./layouts/Footer";

function App() {
  return (
    <div>
      <NavBar />
      <PageContainer>
        <AppRoutes />
      </PageContainer>
      <Footer />
    </div>
  );
}

export default App;
