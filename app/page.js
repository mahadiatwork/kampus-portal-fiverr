import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import hero_banner from "../public/assets/hero_banner.png";

async function fetchJobs(accessToken) {
  try {
    const jobs = await axios.get(
      `https://www.zohoapis.eu/crm/v2.1/ZORDIJOB?fields=JOB_ID,Intitul_du_poste,Profil_souhait_exp_rience_comp_tence,Localisation_poste,Date_recrutement&per_page=200`,
      {
        headers: {
          Authorization: `${accessToken}`, // Ensure correct format
        },
      }
    );
    return jobs.data.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des données des offres d'emploi:", error);
    return null;
  }
}

export default async function Home() {

  const response = await axios.get(process.env.ACCESSTOKEN_URL);
  const accessToken = response.data.access_token;

  const fetchedJobs = await fetchJobs(accessToken);

  // Afficher seulement les 5 premières offres d'emploi comme teaser
  const jobTeaser = fetchedJobs ? fetchedJobs.slice(0, 5) : [];

  return (
    <main>
      {/* Section Hero */}
      <section className="bg-gray-100 py-20">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
          <div className="max-w-lg">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Sécurisez votre carrière. Vous le méritez.
            </h1>
            <p className="text-lg mb-6">
              Nous aidons les chercheurs d'emploi ambitieux avec des outils et des ressources complètes pour découvrir, postuler et sécuriser leur emploi de rêve.
            </p>
            <div className="flex items-center space-x-2">
              <button className="bg-[#FFCF56] px-6 py-2 rounded-lg">
                Connexion/Inscription
              </button>
            </div>
          </div>
          <div className="mt-10 md:mt-0">
            <Image
              src={hero_banner} // Remplacez par le chemin de votre image
              alt="Image Héro"
              width={400}
              height={400}
              priority
            />
          </div>
        </div>
      </section>

      {/* Section des offres d'emploi (Teaser) */}
      <section className="py-20">
        <div className="container mx-auto text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Offres d'emploi</h2>
          <p className="text-lg text-gray-600 mb-6">
            Nous avons {fetchedJobs.length} offres d'emploi publiées pour vous. Découvrez-en quelques-unes ci-dessous :
          </p>
        </div>

        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobTeaser.map((job) => (
            <div key={job.JOB_ID} className="bg-white shadow-md rounded-lg p-6 text-center">
              <h3 className="text-xl font-bold mb-2">{job.Intitul_du_poste}</h3>
              <p className="text-gray-600 mb-2">{job.Localisation_poste}</p>
              <p className="text-gray-500">Expérience: {job.Profil_souhait_exp_rience_comp_tence}</p>
            </div>
          ))}
        </div>

        {/* Bouton Voir Plus d'Offres */}
        <div className="container mx-auto text-center mt-12">
          <Link href="/jobs">
            <button className="bg-[#623CEA] text-white px-6 py-3 rounded-lg">
              Voir plus d'offres
            </button>
          </Link>
        </div>
      </section>
    </main>
  );
}
