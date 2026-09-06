import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Home from "./pages/Home"
import AuthPage from "./pages/AuthPage"
import ChatPage from "./pages/ChatPage"
import TermsOfService from "./pages/TermsOfService"
import PrivacyPolicy from "./pages/PrivacyPolicy"
import ForgotPassword from "./pages/ForgotPassword"
import AppToaster from "./components/common/AppToaster"

const App = () => {
  return (
    <BrowserRouter>
      <AppToaster />
      <Routes>
        {/* Product Landing Page */}
        <Route path="/" element={<Home />} />
        
        {/* Authentication Routes */}
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/login" element={<AuthPage defaultMode="login" />} />
        <Route path="/register" element={<AuthPage defaultMode="register" />} />
        
        {/* Multi-Agent Chat Studio Workspace */}
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/app" element={<Navigate to="/chat" replace />} />

        {/* Account Management & Legal */}
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ForgotPassword />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />

        {/* Fallback Catch-all Route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App