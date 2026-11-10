import React, { useState } from 'react';
import { validateEnrollment, EnrollmentData } from '../utils/textLayers';
import { X, CheckCircle, GraduationCap, Calendar, Download, ShieldCheck } from 'lucide-react';

interface EnrollmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EnrollmentModal: React.FC<EnrollmentModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<EnrollmentData>({
    fullName: '',
    email: '',
    university: '',
    academicLevel: 'undergraduate',
    researchInterest: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionHash, setSubmissionHash] = useState('');

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = validateEnrollment(formData);
    if (!result.isValid) {
      setErrors(result.errors);
      return;
    }

    const randomHash = `NU-${Math.random().toString(36).substring(2, 9).toUpperCase()}-2026`;
    setSubmissionHash(randomHash);
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({
      fullName: '',
      email: '',
      university: '',
      academicLevel: 'undergraduate',
      researchInterest: '',
    });
    setErrors({});
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="enrollment-modal-title"
      className="fixed inset-0 z-9999 bg-[#111111]/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
    >
      <div className="bg-[#F9F8F6] border border-[#111111]/20 max-w-2xl w-full p-8 md:p-10 rounded shadow-2xl relative my-8">
        <button
          type="button"
          onClick={handleReset}
          className="absolute top-6 right-6 p-2 text-[#111111]/60 hover:text-[#111111] border border-[#111111]/10 rounded hover:border-[#B45309]"
          aria-label="Cerrar ventana de postulación"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#B45309] mb-2 font-bold">
              <GraduationCap className="w-4 h-4" />
              <span>CONVOCATORIA ACADÉMICA MMXXVI</span>
            </div>

            <h2 id="enrollment-modal-title" className="text-3xl font-serif-title font-medium text-[#111111]">
              Postulación a la Cátedra Universitaria
            </h2>

            <p className="font-serif text-sm text-[#111111]/75 mt-2">
              Ingresa tus datos para solicitar cupo en los seminarios sincrónicos y acceder al repositorio digital de manuscritos bíblicos en 8K.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5" noValidate>
              <div>
                <label htmlFor="fullName" className="block text-xs font-mono uppercase tracking-wider text-[#111111]/70 mb-1.5">
                  Nombre Completo *
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Ej. Martín Heidegger o Sor Juana Inés"
                  className={`w-full px-4 py-2.5 bg-white border rounded text-sm text-[#111111] placeholder:text-[#111111]/30 focus:outline-none focus:ring-1 focus:ring-[#B45309] ${
                    errors.fullName ? 'border-red-600' : 'border-[#111111]/20'
                  }`}
                />
                {errors.fullName && (
                  <p className="text-xs text-red-600 mt-1 font-sans">{errors.fullName}</p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="email" className="block text-xs font-mono uppercase tracking-wider text-[#111111]/70 mb-1.5">
                    Correo Institucional o Personal *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="nombre@universidad.edu"
                    className={`w-full px-4 py-2.5 bg-white border rounded text-sm text-[#111111] placeholder:text-[#111111]/30 focus:outline-none focus:ring-1 focus:ring-[#B45309] ${
                      errors.email ? 'border-red-600' : 'border-[#111111]/20'
                    }`}
                  />
                  {errors.email && (
                    <p className="text-xs text-red-600 mt-1 font-sans">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="university" className="block text-xs font-mono uppercase tracking-wider text-[#111111]/70 mb-1.5">
                    Universidad o Centro de Estudio *
                  </label>
                  <input
                    type="text"
                    id="university"
                    name="university"
                    value={formData.university}
                    onChange={handleChange}
                    placeholder="Ej. Universidad de Buenos Aires"
                    className={`w-full px-4 py-2.5 bg-white border rounded text-sm text-[#111111] placeholder:text-[#111111]/30 focus:outline-none focus:ring-1 focus:ring-[#B45309] ${
                      errors.university ? 'border-red-600' : 'border-[#111111]/20'
                    }`}
                  />
                  {errors.university && (
                    <p className="text-xs text-red-600 mt-1 font-sans">{errors.university}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="academicLevel" className="block text-xs font-mono uppercase tracking-wider text-[#111111]/70 mb-1.5">
                  Nivel Académico *
                </label>
                <select
                  id="academicLevel"
                  name="academicLevel"
                  value={formData.academicLevel}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-white border border-[#111111]/20 rounded text-sm text-[#111111] focus:outline-none focus:ring-1 focus:ring-[#B45309]"
                >
                  <option value="undergraduate">Estudiante de Pregrado / Licenciatura</option>
                  <option value="postgraduate">Estudiante de Maestría o Doctorado</option>
                  <option value="faculty">Profesor / Catedrático / Investigador</option>
                  <option value="independent">Investigador Independiente / Humanidades</option>
                </select>
              </div>

              <div>
                <label htmlFor="researchInterest" className="block text-xs font-mono uppercase tracking-wider text-[#111111]/70 mb-1.5">
                  Línea de Interés / Proyecto Exegético *
                </label>
                <textarea
                  id="researchInterest"
                  name="researchInterest"
                  rows={3}
                  value={formData.researchInterest}
                  onChange={handleChange}
                  placeholder="Describe brevemente tus intereses: crítica textual, poética hebrea, literatura sapiencial, etc."
                  className={`w-full px-4 py-2.5 bg-white border rounded text-sm text-[#111111] placeholder:text-[#111111]/30 focus:outline-none focus:ring-1 focus:ring-[#B45309] ${
                    errors.researchInterest ? 'border-red-600' : 'border-[#111111]/20'
                  }`}
                />
                {errors.researchInterest && (
                  <p className="text-xs text-red-600 mt-1 font-sans">{errors.researchInterest}</p>
                )}
              </div>

              <div className="pt-4 flex items-center justify-between gap-4 border-t border-[#111111]/10">
                <span className="text-[11px] font-mono text-[#111111]/50">
                  * Admisión libre para la comunidad universitaria
                </span>
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#111111] hover:bg-[#B45309] text-white text-xs font-mono uppercase tracking-widest rounded transition-colors"
                  data-cursor="ENVIAR"
                >
                  Registrar Postulación
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-6">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8" />
            </div>

            <span className="text-xs font-mono uppercase tracking-widest text-[#B45309] font-bold">
              POSTULACIÓN REGISTRADA EXITOSAMENTE
            </span>

            <h3 className="text-3xl font-serif-title font-medium text-[#111111] mt-2">
              Bienvenido a NarrativaU
            </h3>

            <p className="font-serif text-sm text-[#111111]/80 max-w-md mx-auto mt-3">
              Estimado(a) <strong className="text-[#111111]">{formData.fullName}</strong> ({formData.university}), tu solicitud ha sido radicada bajo el folio académico:
            </p>

            <div className="my-6 p-4 bg-[#FFFFFF] border border-dashed border-[#B45309] rounded max-w-sm mx-auto font-mono text-sm text-[#B45309] font-bold">
              {submissionHash}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 pt-6 border-t border-[#111111]/10">
              <button
                type="button"
                onClick={handleReset}
                className="w-full sm:w-auto px-6 py-2.5 bg-[#111111] text-white text-xs font-mono uppercase tracking-wider rounded hover:bg-[#B45309] transition-colors"
              >
                Volver al Sitio
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
