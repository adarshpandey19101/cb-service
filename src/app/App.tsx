import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { AuthProvider } from '@/contexts/AuthContext';
import { Navbar } from '@/app/components/Navbar';
import { Footer } from '@/app/components/Footer';
import { ScrollToTopButton } from '@/app/components/ScrollToTop';
import { Home } from '@/app/pages/Home';
import { About } from '@/app/pages/About';
import { Services } from '@/app/pages/Services';
import { Careers } from '@/app/pages/Careers';
import { Blog } from '@/app/pages/Blog';
import { BlogDetail } from '@/app/pages/BlogDetail';
import { Contact } from '@/app/pages/Contact';
import { Login } from '@/app/pages/Login';
import { Signup } from '@/app/pages/Signup';
import { PrivacyPolicy } from '@/app/pages/PrivacyPolicy';
import { TermsConditions } from '@/app/pages/TermsConditions';
import { NotFound } from '@/app/pages/NotFound';
import { Profile } from '@/app/pages/Profile';
import { Dashboard } from '@/app/pages/Dashboard';
import { Projects } from '@/app/pages/Projects';
import { ProjectDetail } from '@/app/pages/ProjectDetail';
import { ProjectForm } from '@/app/pages/ProjectForm';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// Layout wrapper
function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  if (isAuthPage) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <ScrollToTopButton />
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
            <Route path="/projects/:id/edit" element={<ProjectForm />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-conditions" element={<TermsConditions />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}