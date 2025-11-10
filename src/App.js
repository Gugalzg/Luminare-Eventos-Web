import './App.css';
import Background from './components/Background/Background';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Services from './components/Services/Services';
import About from './components/About/About';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <div className="App">
      {/* Flocos de Neve de Natal - Descomente para ativar */}
      {/* {[...Array(20)].map((_, i) => (
        <div key={i} className="snowflake">❄</div>
      ))} */}
      
      <Background />
      <Header />
      <Hero />
      <Services />
      <About />
      <Contact />
      <Footer />

    </div>
  );
}

export default App;