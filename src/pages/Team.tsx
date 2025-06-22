import { useState, useEffect } from "react";
import Navigation from "../components/Navigation";
import WhatsAppButton from "../components/WhatsAppButton";
import Footer from "../components/Footer";
import { teamService } from "@/services/api";
import type { TeamMember } from "@/types/api";

const TeamPage = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        setLoading(true);
        const response = await teamService.getAll();
        setTeamMembers(response.data.data);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch team members:", err);
        setError("Nu am putut încărca membrii echipei. Vă rugăm să încercați din nou mai târziu.");
      } finally {
        setLoading(false);
      }
    };

    fetchTeamMembers();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />

      <div className="pt-20 sm:pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="text-center mb-12 sm:mb-16">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 mb-4">
              Echipa noastră
            </h1>
            <div className="w-24 h-1 bg-red-600 mx-auto"></div>
          </div>

          {/* Loading and Error States */}
          {loading && <p className="text-center text-slate-600">Se încarcă...</p>}
          {error && <p className="text-center text-red-600">{error}</p>}

          {/* Team Grid */}
          {!loading && !error && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
              {teamMembers.map((member) => (
                <div key={member.id} className="text-center group">
                  {/* Profile Image */}
                  <div className="relative mb-6">
                    <div className="w-32 h-32 sm:w-40 sm:h-40 mx-auto rounded-full overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-300">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  </div>

                  {/* Member Info */}
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-slate-800 group-hover:text-red-600 transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-red-600 font-medium text-base">
                      {member.role}
                    </p>
                    <div className="space-y-2 text-sm text-slate-600">
                      <div className="flex items-center justify-center gap-2">
                        <span className="font-medium">{member.phone}</span>
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <a
                          href={`mailto:${member.email}`}
                          className="text-red-600 hover:text-red-700 hover:underline transition-colors"
                        >
                          {member.email}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Bottom section */}
          <div className="mt-16 text-center">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-red-100 max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">
                Alătură-te echipei noastre!
              </h2>
              <p className="text-slate-600 mb-6">
                Suntem mereu în căutarea unor profesioniști pasionați de
                domeniul imobiliar.
              </p>
              <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-xl font-medium transition-all duration-200 shadow-md hover:shadow-lg">
                Trimite CV-ul tău
              </button>
            </div>
          </div>
        </div>
      </div>

      <WhatsAppButton />
      <Footer />
    </div>
  );
};

export default TeamPage;
