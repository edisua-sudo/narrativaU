import React, { useState } from 'react';
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

  const handleExploreClick = () => {
    const el = document.getElementById('horizontes');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F8F6] text-[#111111] selection:bg-[#B45309] selection:text-white relative">
      {/* Interactive Custom Cursor */}
      <CustomCursor />

      {/* Preloader with autostart support */}
      {!isLoaded && <Preloader onComplete={() => setIsLoaded(true)} />}

      {/* Top Navigation Bar */}
      <Navbar onOpenEnrollment={() => setIsEnrollmentOpen(true)} />

      {/* Main Content Area */}
      <main id="main-content">
        {/* Hero Section */}
        <HeroSection
          onExploreClick={handleExploreClick}
          onOpenEnrollment={() => setIsEnrollmentOpen(true)}
        />

        {/* Dynamic Horizontal Scroll Section (Qué, Dónde, Cómo) */}
        <HorizontalScrollSection />

        {/* Interactive Manuscript Layer Explorer */}
        <ManuscriptLayerExplorer />

        {/* Academic Archive & Primary Sources Section */}
        <AcademicArchiveSection />

        {/* Fullscreen Testimonial with Torchlight / Lantern Effect */}
        <TestimonialTorchlight />
      </main>

      {/* Editorial Footer */}
      <FooterSection onOpenEnrollment={() => setIsEnrollmentOpen(true)} />

      {/* Academic Enrollment & Syllabus Modal */}
      <EnrollmentModal
        isOpen={isEnrollmentOpen}
        onClose={() => setIsEnrollmentOpen(false)}
      />
    </div>
  );
}
