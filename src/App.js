import './App.css';
import { Routes, Route } from 'react-router-dom';
import Background from './components/Background/Background';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Services from './components/Services/Services';
import About from './components/About/About';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import CardapioDigital from './components/CardapioDigital/CardapioDigital';

function HomePage() {
  return (
    <>
      <Background />
      <Header />
      <Hero />
      <Services />
      <About />
      <Contact />
      <Footer />
    </>
  );
}

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cardapio" element={<CardapioDigital />} />
      </Routes>
    </div>
  );
}

export default App;