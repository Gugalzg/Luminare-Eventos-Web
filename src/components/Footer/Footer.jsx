import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-bg-effects">
        <div className="footer-orb orb1"></div>
        <div className="footer-orb orb2"></div>
        <div className="footer-orb orb3"></div>
        <div className="footer-wave"></div>
      </div>
      
      <div className="footer-content">
        <div className="footer-credits">
          <p>&copy; 2025 Luminare Eventos. Todos os direitos reservados.</p>
          <p className="dev-credits">
            Desenvolvido por{' '}
            <a 
              href="https://github.com/Gugalzg" 
              target="_blank" 
              rel="noopener noreferrer"
              className="dev-link"
            >
              Luiz Gustavo
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;