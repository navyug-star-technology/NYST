import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AdminApp from "../admin/AdminApp.jsx";
import { SiteContentProvider } from "./components/site-content.jsx";
import AboutPage from "./routes/about.jsx";
import ContactPage from "./routes/contact.jsx";
import FAQPage from "./routes/faq.jsx";
import HomePage from "./routes/index.jsx";
import PortfolioPage from "./routes/portfolio.jsx";
import ProductsPage from "./routes/products.jsx";
import QuestionPage from "./routes/question.jsx";
import ServicesPage from "./routes/services.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <SiteContentProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/question" element={<QuestionPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/admin" element={<AdminApp />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </SiteContentProvider>
    </BrowserRouter>
  );
}
