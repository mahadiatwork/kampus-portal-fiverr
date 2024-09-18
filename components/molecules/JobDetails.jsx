// components/JobDetails.js

'use client'; // Add this to make it a client component

import { useRouter } from 'next/navigation';

export default function JobDetails({ job }) {
  const router = useRouter();

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <button
        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
        onClick={() => router.back()}
      >
        ⬅ Retour
      </button>

      <h1 className="text-3xl font-bold mb-4">{job.Intitul_du_poste || 'Poste non spécifié'}</h1>
      
      <div className="text-gray-600 mb-6">
        <span className="font-semibold">Nom de l'entreprise:</span>
        <span className="ml-2 text-sm text-gray-700">{job.Nom_de_l_entreprise || 'Entreprise non spécifiée'}</span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="text-gray-600">
          <p>
            <span className="font-semibold">Date de recrutement:</span> {job.Date_recrutement || 'Non spécifiée'}
          </p>
          <p>
            <span className="font-semibold">Localisation:</span> {job.Localisation_poste || 'Localisation non spécifiée'}
          </p>
        </div>
        <div className="text-gray-600">
          <p>
            <span className="font-semibold">Nom du recruteur:</span> {job.Nom_du_recruteur || 'Non spécifié'}
          </p>
          <p>
            <span className="font-semibold">Téléphone du recruteur:</span> {job.T_l_phone_du_recruteur || 'Non spécifié'}
          </p>
        </div>
        <div className="text-gray-600">
          <p>
            <span className="font-semibold">Email du recruteur:</span> {job.Mail_du_recruteur || 'Non spécifié'}
          </p>
        </div>
        <div className="text-gray-600">
          <p>
            <span className="font-semibold">Statut de l'offre:</span> {job.Statut_de_l_offre || 'Non spécifié'}
          </p>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Description du poste:</h2>
        <p className="text-gray-700">{job.Description_du_poste || 'Aucune description disponible'}</p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Profil souhaité / Expérience et compétences:</h2>
        <p className="text-gray-700">{job.Profil_souhait_exp_rience_comp_tence || 'Non spécifié'}</p>
      </div>

      <div className="flex space-x-4">
        <button className="bg-[#FFCF56] py-2 px-4 rounded-lg">
          POSTULER POUR CE POSTE
        </button>
      </div>
    </div>
  );
}
