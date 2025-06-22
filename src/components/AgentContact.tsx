import { Phone, MessageSquare } from "lucide-react";
import { Button } from "./ui/button";
import { TeamMember } from "@/types/models";

interface AgentContactProps {
  agent?: TeamMember;
}

const AgentContact = ({ agent }: AgentContactProps) => {
  if (!agent) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-lg border border-red-100 text-center">
        <p className="text-slate-600">Informațiile agentului nu sunt disponibile.</p>
      </div>
    );
  }

  const { firstName, lastName, role, phone, image } = agent;
  const agentName = `${firstName} ${lastName}`;
  const agentImage = image || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80";

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-red-100">
      {/* Agent Info */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 rounded-full overflow-hidden bg-slate-200">
          <img
            src={agentImage}
            alt={agentName}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-slate-800">{agentName}</h3>
          <p className="text-sm text-slate-600 capitalize">{role.replace(/_/g, ' ')}</p>
          <div className="flex items-center gap-2 mt-1">
            <Phone className="h-4 w-4 text-red-600" />
            <span className="text-red-600 font-medium">{phone}</span>
          </div>
        </div>
      </div>

      {/* Contact Actions */}
      <div className="grid grid-cols-2 gap-3">
        <Button
          variant="outline"
          className="border-red-200 text-slate-700 hover:bg-red-50"
        >
          <Phone className="h-4 w-4 mr-2" />
          Sună
        </Button>
        <Button
          variant="outline"
          className="border-red-200 text-slate-700 hover:bg-red-50"
        >
          <MessageSquare className="h-4 w-4 mr-2" />
          WhatsApp
        </Button>
      </div>
    </div>
  );
};

export default AgentContact;
