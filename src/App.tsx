import React, { useState, useEffect } from 'react';
import { CustomCursor } from './components/CustomCursor';
import { Preloader } from './components/Preloader';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { HorizontalScrollSection } from './components/HorizontalScrollSection';
import { ManuscriptLayerExplorer } from './components/ManuscriptLayerExplorer';
import { AcademicArchiveSection } from './components/AcademicArchiveSection';
import { TestimonialTorchlight } from './components/TestimonialTorchlight';
import { EnrollmentModal } from './components/EnrollmentModal';
import { FooterSection } from './components/FooterSection';

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isEnrollmentOpen, setIsEnrollmentOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  const handleExploreClick = () => {
    const el = document.getElementById('metodologia');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFC] dark:bg-[#0B0F19] text-slate-900 dark:text-slate-100 paper-grid selection:bg-[#005A9C] selection:text-white relative transition-colors duration-500">
      {/* Cursor Personalizado Interactivo */}
      <CustomCursor />

      {/* Preloader Tipográfico con soporte ?autostart=1 */}
      {!isLoaded && <Preloader onComplete={() => setIsLoaded(true)} />}

      {/* Barra Superior Glassmorphism + Menú Full-Screen Overlay */}
      <Navbar
        onOpenEnrollment={() => setIsEnrollmentOpen(true)}
        isDark={isDark}
        onToggleTheme={() => setIsDark(prev => !prev)}
      />

      {/* Contenido Principal */}
      <main id="main-content">
        {/* Hero Asimétrico + Sección de Metodología 3D (01 Historia, 02 Entorno, 03 Método) */}
        <HeroSection
          onExploreClick={handleExploreClick}
          onOpenEnrollment={() => setIsEnrollmentOpen(true)}
          isDark={isDark}
          onToggleTheme={() => setIsDark(prev => !prev)}
        />

        {/*Laboratorio Interactivo de Estratigrafía Textual */}
        <ManuscriptLayerExplorer />

        {/* Galería Scrollytelling Horizontal (Qué, Dónde, Cómo) */}
        <HorizontalScrollSection />

        {/* Archivo Digital de Fuentes Primarias */}
        <AcademicArchiveSection />

        {/* Testimonio de Alto Impacto (#0F172A) con Efecto Linterna */}
        <TestimonialTorchlight />
      </main>

      {/* Footer Institucional Minimalista */}
      <FooterSection onOpenEnrollment={() => setIsEnrollmentOpen(true)} />

      {/* Modal de Inscripción Gratuita */}
      <EnrollmentModal
        isOpen={isEnrollmentOpen}
        onClose={() => setIsEnrollmentOpen(false)}
      />
    </div>
  );
}
