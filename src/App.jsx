import AppRoutes from "./config/AppRoutes";
import NavBar from "./layouts/NavBar";
import PageContainer from "./layouts/PageContainer";
import Footer from "./layouts/Footer";

function App() {
  return (
    <div className="flex flex-col justify-start h-screen ">
      <NavBar />
      {/* The basis may need to change depending on the content it holds. We need to come back to this later */}
      <PageContainer>
        <AppRoutes />
      </PageContainer>
      <Footer />
    </div>
  );
}

export default App;
