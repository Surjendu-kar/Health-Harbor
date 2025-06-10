import { ThemeProvider } from "@mui/material/styles";
import { Box, styled } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { theme } from "./theme";
import Navbar from "./components/header/Navbar";
import Footer from "./components/footer/Footer";
import Routing from "./routes/Routing";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";

const AppContainer = styled(Box)({
  minHeight: "100vh",
  backgroundColor: "#F5F5F5",
  display: "flex",
  flexDirection: "column",
});

const MainContent = styled(Box)({
  flex: 1,
});

function App() {
  return (
    <ErrorBoundary>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <ThemeProvider theme={theme}>
        <AppContainer>
          <Navbar />
          <MainContent>
            <Routing />
          </MainContent>
          <Footer />
        </AppContainer>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
