import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";

const BackToProperties = () => {
  const navigate = useNavigate();

  return (
    <div className="mt-8 pt-8 border-t border-slate-200">
      <Button
        variant="ghost"
        onClick={() => navigate("/proprietati")}
        className="text-slate-600 hover:text-slate-800 hover:bg-slate-100 flex items-center gap-2"
      >
        <ArrowLeft className="h-4 w-4" />
        Înapoi la Apartamente de vânzare
      </Button>
    </div>
  );
};

export default BackToProperties;
