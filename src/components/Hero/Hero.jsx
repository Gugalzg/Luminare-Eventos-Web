import './Hero.css';
import { useNavigate } from 'react-router-dom';
import { openWhatsApp } from '../../utils/whatsapp';
import TypewriterText from './TypewriterText';

function Hero() {
  const navigate = useNavigate();

  const handleServicesClick = () => {
    const servicesSection = document.getElementById('servicos');
    servicesSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleWhatsAppClick = () => {
    openWhatsApp('', 'hero');
  };

  const handleSimularFestaClick = () => {
    navigate('/cardapio');
  };

  const typewriterTexts = [
    "experiências únicas",
    "momentos inesquecíveis", 
    "celebrações especiais"
  ];

  return (
    <section className="hero" id="home">
      <div className="hero-bg-effects">
        <div className="glow-orb orb1"></div>
        <div className="glow-orb orb2"></div>
        <div className="glow-orb orb3"></div>
      </div>
      
      <div className="hero-content">
        <h1>
          Criamos <TypewriterText texts={typewriterTexts} speed={100} pauseTime={2500} /> para seus eventos
        </h1>
        <p>
          Na Luminare Eventos, transformamos suas ideias em momentos inesquecíveis. 
          Com planejamento e execução, cuidamos de cada detalhe para que seu evento seja perfeito.
        </p>
        <div className="hero-buttons">
          <button className="primary-btn" onClick={handleServicesClick}>
            <span>Nossos Serviços</span>
          </button>
          <button className="secondary-btn hero-btn-desktop" onClick={handleWhatsAppClick}>
            <span>Fale Conosco</span>
          </button>
          <button className="hero-btn-simular hero-btn-mobile" onClick={handleSimularFestaClick}>
            <span className="btn-sparkle">✨</span>
            <span>Simular Festa</span>
          </button>
        </div>
      </div>
      
      <div className="hero-visual">
        <div className="logo-container">
          <div className="floating-shape shape1"></div>
          <div className="floating-shape shape2"></div>
          <div className="floating-shape shape3"></div>
          <div className="floating-shape shape4"></div>
          <div className="floating-shape shape5"></div>
          <div className="hero-logo">
            <img src="/logo-luminare.png" alt="Luminare Eventos" className="hero-logo-img" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;