import { useState } from "react";
import { Button } from "./ui/button";

interface PropertyDescriptionProps {
  description: string;
}

const PropertyDescription = ({ description }: PropertyDescriptionProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!description) {
    return null;
  }

  const previewText = description.split(" ").slice(0, 50).join(" ");
  const shouldShowButton = description.split(" ").length > 50;

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200/80 mb-8">
      <h2 className="text-xl font-semibold text-slate-800 mb-4">
        Descrierea proprietății
      </h2>

      <div className="text-slate-600 leading-relaxed">
        <p className={`${!isExpanded ? "line-clamp-4" : ""}`}>
          {isExpanded ? description : previewText}
          {!isExpanded && shouldShowButton && "..."}
        </p>

        {shouldShowButton && (
          <Button
            variant="link"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-red-600 hover:text-red-700 px-0 mt-2"
          >
            {isExpanded ? "Citește mai puțin" : "Citește mai mult"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default PropertyDescription;
