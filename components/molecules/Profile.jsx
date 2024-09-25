'use client';

import { useState } from 'react';
import axios from 'axios';

export default function ProfileForm({ candidate }) {
  const [formData, setFormData] = useState({
    firstName: candidate.First_Name,
    lastName: candidate.Last_Name,
    email: candidate.Email,
    CV_LINK: candidate.CV_Link, // New field for CV URL
    STUDENT_ID: candidate.STUDENT_ID, // Ensure you have the userId for updating the correct user
    id: candidate.id
  });

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false); // New loading state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateUrl = (url) => {
    const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))' + // domain name or IP
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateUrl(formData.cvUrl)) {
      setMessage('Veuillez fournir une URL valide pour votre CV.');
      return;
    }
    setLoading(true); // Set loading to true when the form is submitted
    try {
      // Create a new FormData object to include URL uploads
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });

      // Call the API route to update profile data
      const response = await axios.post('../api/zoho/updateprofile', formDataToSend, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log({ response });
      if (response.status === 200 && response.data.success) {
        setMessage('Profil mis à jour avec succès !');
      } else {
        setMessage('Échec de la mise à jour du profil. Veuillez réessayer.');
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour du profil :', error);
      setMessage('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setLoading(false); // Set loading to false after the API call
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Profil du Candidat</h1>
      {message && <p className="mb-4 text-green-600">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Prénom
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Nom de famille
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            ID Étudiant
          </label>
          <input
            type="text"
            name="studentId"
            value={formData.STUDENT_ID}
            disabled
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 cursor-not-allowed"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            URL du CV
          </label>
          <input
            type="url"
            name="CV_LINK"
            value={formData.CV_LINK}
            onChange={handleChange}
            placeholder="Entrez l'URL de votre CV (Google Drive, OneDrive, etc.)"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
          <p className="text-sm text-gray-500 mt-1">
            Veuillez télécharger votre CV sur un service de stockage en ligne (comme Google Drive ou OneDrive) et entrer le lien partagé ici.
          </p>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 flex items-center"
            disabled={loading} // Disable the button while loading
          >
            {loading ? (
              <svg
                className="animate-spin h-5 w-5 mr-3 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                ></path>
              </svg>
            ) : null}
            {loading ? 'Sauvegarde...' : 'Enregistrer les modifications'}
          </button>
        </div>
      </form>
    </div>
  );
}
