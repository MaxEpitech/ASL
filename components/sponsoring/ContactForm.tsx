'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import { Send, CheckCircle, Check, X } from 'lucide-react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    tier: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'name':
        return value.trim().length < 2 ? 'Le nom doit contenir au moins 2 caractères' : '';
      case 'email':
        return !validateEmail(value) ? 'Email invalide' : '';
      case 'message':
        return value.trim().length < 10 ? 'Le message doit contenir au moins 10 caractères' : '';
      default:
        return '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Implement actual email sending via API route
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Une erreur est survenue lors de l\'envoi du message');
      }

      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: '',
          company: '',
          email: '',
          phone: '',
          tier: '',
          message: '',
        });
      }, 3000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setIsSubmitting(false);
      setErrors({
        ...errors,
        submit: 'Une erreur est survenue. Veuillez réessayer plus tard.',
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched({ ...touched, [name]: true });
    const error = validateField(name, value);
    setErrors({ ...errors, [name]: error });
  };

  if (isSubmitted) {
    return (
      <div className="bg-green-50 border-2 border-green-500 rounded-lg p-12 text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-serif font-bold text-green-700 mb-2">
          Message envoyé avec succès !
        </h3>
        <p className="text-green-600">
          Nous vous répondrons dans les plus brefs délais.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
            Nom / Prénom *
          </label>
          <div className="relative">
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-4 py-3 pr-10 border rounded-lg focus:ring-2 outline-none transition ${
                touched.name && errors.name
                  ? 'border-red-500 focus:ring-red-400'
                  : touched.name && !errors.name && formData.name
                  ? 'border-green-500 focus:ring-green-400'
                  : 'border-gray-300 focus:ring-royal focus:border-royal'
              }`}
            />
            {touched.name && formData.name && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                {errors.name ? (
                  <X className="w-5 h-5 text-red-500" />
                ) : (
                  <Check className="w-5 h-5 text-green-500" />
                )}
              </div>
            )}
          </div>
          {touched.name && errors.name && (
            <p className="text-sm text-red-600 mt-1">{errors.name}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="company" className="block text-sm font-semibold text-gray-700 mb-2">
            Entreprise
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal focus:border-royal outline-none transition"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
            Email *
          </label>
          <div className="relative">
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-4 py-3 pr-10 border rounded-lg focus:ring-2 outline-none transition ${
                touched.email && errors.email
                  ? 'border-red-500 focus:ring-red-400'
                  : touched.email && !errors.email && formData.email
                  ? 'border-green-500 focus:ring-green-400'
                  : 'border-gray-300 focus:ring-royal focus:border-royal'
              }`}
            />
            {touched.email && formData.email && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                {errors.email ? (
                  <X className="w-5 h-5 text-red-500" />
                ) : (
                  <Check className="w-5 h-5 text-green-500" />
                )}
              </div>
            )}
          </div>
          {touched.email && errors.email && (
            <p className="text-sm text-red-600 mt-1">{errors.email}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
            Téléphone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal focus:border-royal outline-none transition"
          />
        </div>
      </div>

      <div className="mb-6">
        <label htmlFor="tier" className="block text-sm font-semibold text-gray-700 mb-2">
          Palier de partenariat souhaité
        </label>
        <select
          id="tier"
          name="tier"
          value={formData.tier}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal focus:border-royal outline-none transition"
        >
          <option value="">-- Sélectionnez un palier --</option>
          <option value="platinium">Platinium (1000€)</option>
          <option value="or">Or (750€)</option>
          <option value="argent">Argent (500€)</option>
          <option value="bronze">Bronze (250€)</option>
          <option value="autre">Autre / Sur mesure</option>
        </select>
      </div>

      <div className="mb-6">
        <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
          Message *
        </label>
        <div className="relative">
          <textarea
            id="message"
            name="message"
            required
            rows={6}
            value={formData.message}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 outline-none transition resize-none ${
              touched.message && errors.message
                ? 'border-red-500 focus:ring-red-400'
                : touched.message && !errors.message && formData.message
                ? 'border-green-500 focus:ring-green-400'
                : 'border-gray-300 focus:ring-royal focus:border-royal'
            }`}
            placeholder="Présentez votre entreprise et votre intérêt pour un partenariat..."
          />
        </div>
        {touched.message && errors.message && (
          <p className="text-sm text-red-600 mt-1">{errors.message}</p>
        )}
      </div>

      <Button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full md:w-auto"
      >
        {isSubmitting ? (
          'Envoi en cours...'
        ) : (
          <>
            <Send className="w-5 h-5 mr-2 inline" />
            Envoyer ma demande
          </>
        )}
      </Button>

      <p className="text-sm text-gray-500 mt-4">
        * Champs obligatoires. Vos données seront traitées confidentiellement.
      </p>
    </form>
  );
}
