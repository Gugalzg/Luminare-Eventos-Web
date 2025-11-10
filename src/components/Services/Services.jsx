import "./Services.css";
import { useState, useEffect, useRef } from "react";
import Modal from "../Modal/Modal";

function Services() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const sectionRef = useRef(null);

  // Efeito para mostrar todos os cards ao mesmo tempo
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            // Remove o observer após ativar uma vez
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px",
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const services = [
    {
      icon: "🎉",
      title: "Mini Festa",
      desc: "Decoração completa para mesa de festa com arranjos, toalhas temáticas e acessórios coordenados.",
      backgroundImage: "/images/services/mini-festa-bg.jpg",
      images: [
        { src: "/images/services/mini-festa-1.jpg", alt: "Mini Festa - Mesa Temática" },
        { src: "/images/services/mini-festa-2.jpg", alt: "Mini Festa - Arranjos Decorativos" },
        { src: "/images/services/mini-festa-3.jpg", alt: "Mini Festa - Detalhes da Decoração" }
      ],
      fullDescription:
        'Transforme sua mesa em um verdadeiro cenário de festa! Nosso serviço de "Mini Festa" inclui toda a decoração necessária para criar uma mesa temática incrível, desde toalhas e arranjos até utensílios coordenados e elementos decorativos únicos.',
      features: [
        "Arco Redondo Pequeno",
        "Mini Arco de Balões (Máximo 2 cores)",
        "Bandejas",
        "Vasos com Arbusto",
        "Capa Temática",
      ]
    },
    {
      icon: "🎂",
      title: "Kit Mêsversário",
      desc: "Kits completos para celebrar cada mês do seu bebê com decoração temática, painel e acessórios únicos.",
      backgroundImage: "/images/services/mesversario-bg.jpg",
      images: [
        { src: "/images/services/mesversario-1.jpg", alt: "Kit Mêsversário - 1 mês" },
        { src: "/images/services/mesversario-2.jpg", alt: "Kit Mêsversário - 6 meses" },
        { src: "/images/services/mesversario-3.jpg", alt: "Kit Mêsversario - Setup Completo" },
        { src: "/images/services/mesversario-4.jpg", alt: "Kit Mêsversario - Detalhes Personalizados" }
      ],
      fullDescription:
        "Celebre cada mês de vida do seu bebê com nossos kits especiais de mêsversário. Cada kit é cuidadosamente preparado com decoração temática, painel personalizado e acessórios fotográficos para criar registros únicos de cada fase do crescimento.",
      features: [
        "1x no mês (11 meses)",
        "Serviço 'Mini Festa'",
        "Arco Redondo Pequeno",
        "Mini arco de balões (Máximo 2 cores)",
        "Bandejas",
        "Vasos com Arbusto",
      ]
    },
    {
      icon: "🎈",
      title: "Balão Bubble Personalizado",
      desc: "Balões transparentes personalizados com confetes, flores ou mensagens especiais para momentos únicos.",
      backgroundImage: "/images/services/bubble-bg.jpg",
      images: [
        { src: "/images/services/bubble-1.jpg", alt: "Balão Bubble - Confetes Coloridos" },
        { src: "/images/services/bubble-2.jpg", alt: "Balão Bubble - Flores Secas" },
        { src: "/images/services/bubble-3.jpg", alt: "Balão Bubble - Personalizado" }
      ],
      fullDescription:
        "Nossos balões bubble são a sensação do momento! Balões transparentes de alta qualidade preenchidos com confetes coloridos, flores secas, penas ou outros elementos decorativos. Perfeitos para pedidos de casamento, revelação de sexo, aniversários especiais e muito mais.",
      features: [
        'Balões bubble transparentes de 18" ou 24"',
        "Preenchimento personalizado (confetes, flores, etc.)",
        "Mensagens impressas ou adesivos personalizados",
        "Fitas e acabamentos de luxo",
        "Entrega cuidadosa para manter a qualidade",
        "Opções de cores e temas variados",
      ]
    }

  ];

  // Galeria com todas as categorias
  const galleryCategories = [
    {
      id: 'festas-personalizadas',
      title: 'Festas Personalizadas',
      icon: '✨',
      subtitle: 'Temas únicos criados especialmente para você',
      images: [
        { src: '/images/gallery/festas-personalizadas-1.jpg', alt: 'Festa Personalizada - Homem-Aranha' },
        { src: '/images/gallery/festas-personalizadas-2.jpg', alt: 'Festa Personalizada - Chá de Bebê' },
        { src: '/images/gallery/festas-personalizadas-3.jpg', alt: 'Festa Personalizada - Chá de Panela' },
        { src: '/images/gallery/festas-personalizadas-4.jpg', alt: 'Festa Personalizada - Capivara' },
        { src: '/images/gallery/festas-personalizadas-5.jpg', alt: 'Festa Personalizada - Stitch' },
        { src: '/images/gallery/festas-personalizadas-6.jpg', alt: 'Festa Personalizada - Patrulha Canina' }
      ]
    },
    {
      id: 'mini-festa',
      title: 'Mini Festa',
      icon: '🎉',
      subtitle: 'Decorações encantadoras para momentos especiais',
      images: [
        { src: '/images/gallery/mini-festa-1.jpg', alt: 'Mini Festa - Princesas' },
        { src: '/images/gallery/mini-festa-2.jpg', alt: 'Mini Festa - Stitch' },
        { src: '/images/gallery/mini-festa-3.jpg', alt: 'Mini Festa - Tetê' },
        { src: '/images/gallery/mini-festa-4.jpg', alt: 'Mini Festa - Bosque' },
        { src: '/images/gallery/mini-festa-5.jpg', alt: 'Mini Festa - Moana' },
        { src: '/images/gallery/mini-festa-6.jpg', alt: 'Mini Festa - Turma da Mônica' }
      ]
    },
    {
      id: 'balao-bubble',
      title: 'Balão Bubble',
      icon: '🎈',
      subtitle: 'Balões personalizados que encantam e emocionam',
      images: [
        { src: '/images/gallery/balao-bubble-1.jpg', alt: 'Balão Bubble' },
        { src: '/images/gallery/balao-bubble-2.jpg', alt: 'Balão Bubble' },
        { src: '/images/gallery/balao-bubble-3.jpg', alt: 'Balão Bubble' },
        { src: '/images/gallery/balao-bubble-4.jpg', alt: 'Balão Bubble' },
        { src: '/images/gallery/balao-bubble-5.jpg', alt: 'Balão Bubble' },
        { src: '/images/gallery/balao-bubble-6.jpg', alt: 'Balão Bubble' }
      ]
    }
  ];

  const openModal = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
  };

  const openImageModal = (image) => {
    setSelectedImage(image);
    setIsImageModalOpen(true);
  };

  const closeImageModal = () => {
    setIsImageModalOpen(false);
    setSelectedImage(null);
  };

  // Fechar modal de imagem com tecla ESC
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isImageModalOpen) {
        closeImageModal();
      }
    };

    if (isImageModalOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isImageModalOpen]);

  return (
    <section className="services" id="servicos" ref={sectionRef}>
      <div className="section-bg">
        <div className="wave-1"></div>
        <div className="wave-2"></div>
      </div>
      <h2>
        <span className="section-title">Nossos Serviços</span>
        <span className="section-subtitle">Experiências únicas para cada ocasião</span>
      </h2>
      <div className="services-grid">
        {services.map((service, index) => (
          <div
            className={`service-card ${isVisible ? 'wave-visible' : ''}`}
            key={index}
            style={{
              animationDelay: `${index * 0.1}s`,
              backgroundImage: `url(${service.backgroundImage})`
            }}
          >
            <div className="service-card-overlay"></div>
            <div className="service-card-content">
              <div className="service-icon">
                {service.icon}
              </div>
              <h3>{service.title}</h3>
              <p>{service.desc}</p>
              
              
              <button
                className="service-btn"
                onClick={() => openModal(service)}
              >
                Ver detalhes
              </button>
            </div>
            <div className="card-glow"></div>
          </div>
        ))}
      </div>

      {/* Galeria de Fotos - Todas as Categorias */}
      <div className="services-gallery">
        <div className="gallery-main-header">
          <h3>
            <span className="gallery-main-title">✨ Galeria de Momentos Especiais</span>
            <span className="gallery-main-subtitle">Explore nossos trabalhos e se inspire para seu evento</span>
          </h3>
        </div>

        {galleryCategories.map((category, categoryIndex) => (
          <div key={category.id} className="gallery-category-section">
            <div className="category-header">
              <span className="category-icon">{category.icon}</span>
              <div className="category-text">
                <h4 className="category-title">{category.title}</h4>
                <p className="category-subtitle">{category.subtitle}</p>
              </div>
            </div>

            <div className="gallery-grid">
              {category.images.map((image, index) => (
                <div
                  key={index}
                  className="gallery-item"
                  style={{
                    animationDelay: `${index * 0.08}s`
                  }}
                  onClick={() => openImageModal(image)}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="gallery-image"
                    loading="lazy"
                    onError={(e) => {
                      const img = e.target;
                      const parent = img?.parentElement;
                      
                      if (img && parent) {
                        img.style.display = 'none';
                        parent.style.background = 'linear-gradient(135deg, #f8f9ff, #e8e9ff)';
                        parent.innerHTML = `
                          <div style="
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            justify-content: center;
                            height: 100%;
                            color: #8B5FBF;
                            text-align: center;
                            padding: 1rem;
                          ">
                            <div style="font-size: 2rem; margin-bottom: 0.5rem;">📷</div>
                            <div style="font-size: 0.8rem; opacity: 0.7;">Foto em breve</div>
                          </div>
                        `;
                      }
                    }}
                  />
                  <div className="gallery-overlay">
                    <div className="gallery-icon">🔍</div>
                    <div className="gallery-caption">{image.alt}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Modal de Serviço */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        service={selectedService}
      />

      {/* Modal de Imagem em Tela Cheia */}
      {isImageModalOpen && selectedImage && (
        <div className="image-modal-overlay" onClick={closeImageModal}>
          <div className="image-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="image-modal-close" onClick={closeImageModal} aria-label="Fechar">
              ✕
            </button>
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="image-modal-img"
            />
            <div className="image-modal-caption">{selectedImage.alt}</div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Services;
