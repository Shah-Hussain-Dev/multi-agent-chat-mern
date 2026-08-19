import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import TermsOfService from "./pages/TermsOfService"
import PrivacyPolicy from "./pages/PrivacyPolicy"
import AppToaster from "./components/common/AppToaster"

const App = () => {
  return (
    <BrowserRouter>
      <AppToaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App