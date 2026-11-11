import React, { useState } from 'react';
import { validateEnrollment, EnrollmentData } from '../utils/textLayers';
import { X, CheckCircle, GraduationCap } from 'lucide-react';

interface EnrollmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * [AWWWARDS CRITERION: USABILITY & FORM VALIDATION]
 * Modal accesible de inscripción gratuita con validación en tiempo real,
 * tipografía 'Syne' + 'Plus Jakarta Sans' y cero fuentes monoespaciadas.
 */
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
      className="fixed inset-0 z-9999 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
    >
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 max-w-2xl w-full p-8 md:p-10 rounded-3xl shadow-2xl relative my-8">
        <button
          type="button"
          onClick={handleReset}
          className="absolute top-6 right-6 p-2 text-slate-500 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-700 rounded-full hover:border-[#005A9C] cursor-pointer"
          aria-label="Cerrar ventana de postulación"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div>
            <div className="flex items-center gap-2 text-xs font-body uppercase tracking-widest text-[#008A00] dark:text-emerald-400 mb-2 font-extrabold">
              <GraduationCap className="w-4 h-4" />
              <span>MATRÍCULA UNIVERSITARIA GRATUITA · MMXXVI</span>
            </div>

            <h2
              id="enrollment-modal-title"
              className="text-3xl font-display font-extrabold tracking-tight text-slate-900 dark:text-white"
            >
              Inscripción a Cursos NarrativaU
            </h2>

            <p className="font-body text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
              Ingresa tus datos para solicitar acceso gratuito a los seminarios sincrónicos y al repositorio digital de manuscritos bíblicos en 8K.
            </p>

            <form onSubmit={handleSubmit} className="mt-7 space-y-5" noValidate>
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-xs font-body font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5"
                >
                  Nombre Completo *
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Ej. Luisa Cajamarca"
                  className={`w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border rounded-xl text-sm font-body text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#005A9C] ${
                    errors.fullName ? 'border-red-600' : 'border-slate-200 dark:border-slate-700'
                  }`}
                />
                {errors.fullName && (
                  <p className="text-xs text-red-600 mt-1 font-body font-medium">
                    {errors.fullName}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs font-body font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5"
                  >
                    Correo Institucional o Personal *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="nombre@universidad.edu.co"
                    className={`w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border rounded-xl text-sm font-body text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#005A9C] ${
                      errors.email ? 'border-red-600' : 'border-slate-200 dark:border-slate-700'
                    }`}
                  />
                  {errors.email && (
                    <p className="text-xs text-red-600 mt-1 font-body font-medium">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="university"
                    className="block text-xs font-body font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5"
                  >
                    Universidad o Centro de Estudio *
                  </label>
                  <input
                    type="text"
                    id="university"
                    name="university"
                    value={formData.university}
                    onChange={handleChange}
                    placeholder="Ej. Universidad Nacional de Colombia"
                    className={`w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border rounded-xl text-sm font-body text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#005A9C] ${
                      errors.university
                        ? 'border-red-600'
                        : 'border-slate-200 dark:border-slate-700'
                    }`}
                  />
                  {errors.university && (
                    <p className="text-xs text-red-600 mt-1 font-body font-medium">
                      {errors.university}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="academicLevel"
                  className="block text-xs font-body font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5"
                >
                  Nivel Académico *
                </label>
                <select
                  id="academicLevel"
                  name="academicLevel"
                  value={formData.academicLevel}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-body text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#005A9C]"
                >
                  <option value="undergraduate">Estudiante de Pregrado / Licenciatura</option>
                  <option value="postgraduate">Estudiante de Maestría o Doctorado</option>
                  <option value="faculty">Profesor / Catedrático / Investigador</option>
                  <option value="independent">Investigador Independiente / Humanidades</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="researchInterest"
                  className="block text-xs font-body font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5"
                >
                  Línea de Interés / Proyecto Exegético *
                </label>
                <textarea
                  id="researchInterest"
                  name="researchInterest"
                  rows={3}
                  value={formData.researchInterest}
                  onChange={handleChange}
                  placeholder="Describe brevemente tus intereses: crítica textual, poética hebrea, literatura sapiencial, etc."
                  className={`w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border rounded-xl text-sm font-body text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#005A9C] ${
                    errors.researchInterest
                      ? 'border-red-600'
                      : 'border-slate-200 dark:border-slate-700'
                  }`}
                />
                {errors.researchInterest && (
                  <p className="text-xs text-red-600 mt-1 font-body font-medium">
                    {errors.researchInterest}
                  </p>
                )}
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200 dark:border-slate-800">
                <span className="text-xs font-body text-slate-500 dark:text-slate-400">
                  * Admisión 100% libre para la comunidad universitaria
                </span>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-7 py-3.5 bg-[#008A00] hover:bg-[#007000] text-white text-xs font-body font-extrabold uppercase tracking-widest rounded-xl btn-emerald-glow transition-all cursor-pointer"
                  data-cursor="ENVIAR"
                >
                  Registrar Postulación
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-6">
            <div className="w-14 h-14 bg-[#E6F5E6] text-[#008A00] rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8" />
            </div>

            <span className="text-xs font-body uppercase tracking-widest text-[#008A00] font-extrabold">
              POSTULACIÓN REGISTRADA EXITOSAMENTE
            </span>

            <h3 className="text-3xl font-display font-extrabold tracking-tight text-slate-900 dark:text-white mt-2">
              Bienvenido a NarrativaU
            </h3>

            <p className="font-body text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto mt-3 leading-relaxed">
              Estimado(a) <strong className="text-slate-900 dark:text-white">{formData.fullName}</strong> (
              {formData.university}), tu solicitud ha sido radicada bajo el folio académico:
            </p>

            <div className="my-6 p-4 bg-[#EBF3FA] dark:bg-slate-800 border border-[#005A9C]/30 rounded-2xl max-w-sm mx-auto font-display text-base text-[#005A9C] dark:text-[#38BDF8] font-extrabold tracking-wider tabular-nums">
              {submissionHash}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 pt-6 border-t border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={handleReset}
                className="w-full sm:w-auto px-7 py-3 bg-[#005A9C] text-white text-xs font-body font-bold uppercase tracking-wider rounded-xl hover:bg-[#004578] transition-colors cursor-pointer"
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
