import { useParams } from "react-router-dom";
import { useProperty } from "@/hooks/useApi";
import { getYouTubeEmbedUrl } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Separator } from "@/components/ui/separator";
import PropertyDescription from "@/components/PropertyDescription";
import AgentContact from "@/components/AgentContact";
import RelatedProperties from "@/components/RelatedProperties";

import {
  Bed,
  Bath,
  Ruler,
  MapPin,
  Building,
  Calendar,
  ParkingCircle,
  CheckCircle,
  Tag,
  Eye,
  Heart,
  LoaderCircle,
  AlertTriangle,
} from "lucide-react";

const PropertyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data: propertyData, isLoading, isError } = useProperty(id || "");

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoaderCircle className="animate-spin text-primary w-12 h-12" />
      </div>
    );
  }

  if (isError || !propertyData?.success) {
    return (
      <div className="flex flex-col justify-center items-center h-screen text-center px-4">
        <AlertTriangle className="w-16 h-16 text-destructive mb-4" />
        <h2 className="text-2xl font-semibold text-slate-800 mb-2">
          Eroare la încărcarea proprietății
        </h2>
        <p className="text-slate-600 mb-6 max-w-md">
          Nu am putut încărca detaliile. Te rugăm să încerci din nou.
        </p>
      </div>
    );
  }

  const property = propertyData.data;
  const embedUrl = getYouTubeEmbedUrl(property.videoUrl || "");

  const mediaItems = [];

  if (embedUrl) {
    mediaItems.push({
      type: "youtube",
      content: (
        <AspectRatio ratio={16 / 9} key="video">
          <iframe
            className="w-full h-full rounded-lg"
            src={embedUrl}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </AspectRatio>
      ),
    });
  }

  if (property.images && property.images.length > 0) {
    property.images.forEach((image, index) => {
      mediaItems.push({
        type: "image",
        content: (
          <AspectRatio ratio={16 / 9} key={`image-${index}`}>
            <img
              src={image.url}
              alt={image.alt || property.title}
              className="object-cover w-full h-full rounded-lg"
            />
          </AspectRatio>
        ),
      });
    });
  } else if (mediaItems.length === 0) {
    mediaItems.push({
      type: "placeholder",
      content: (
        <AspectRatio ratio={16 / 9} key="placeholder">
          <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded-lg">
            <span className="text-gray-500">Fără imagini sau video disponibile</span>
          </div>
        </AspectRatio>
      ),
    });
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-0">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Media Carousel */}
          <Card className="mb-8">
            <CardContent className="p-4">
              <Carousel className="w-full">
                <CarouselContent>
                  {mediaItems.map((item, index) => (
                    <CarouselItem key={index}>{item.content}</CarouselItem>
                  ))}
                </CarouselContent>
                {mediaItems.length > 1 && (
                  <>
                    <CarouselPrevious className="-left-4" />
                    <CarouselNext className="-right-4" />
                  </>
                )}
              </Carousel>
            </CardContent>
          </Card>

          {/* Title and Price */}
          <div className="mb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
              {property.title}
            </h1>
            <div className="flex items-center justify-between">
              <p className="text-2xl font-semibold text-primary">
                {new Intl.NumberFormat("ro-RO", {
                  style: "currency",
                  currency: property.currency || "EUR",
                }).format(property.price)}
              </p>
              <div className="flex items-center gap-2">
                {property.status && (
                  <Badge variant={property.status === 'published' ? 'default' : 'secondary'}>
                    {property.status}
                  </Badge>
                )}
                {property.category && (
                  <Badge variant="outline">{property.category}</Badge>
                )}
              </div>
            </div>
            <div className="flex items-center text-gray-500 mt-2">
              <MapPin className="w-4 h-4 mr-2" />
              <span>{property.location}</span>
            </div>
          </div>

          <Separator className="my-6" />

          {/* Key Details */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center mb-8">
            <div className="flex flex-col items-center">
              <Bed className="w-8 h-8 text-primary mb-2" />
              <span className="font-semibold">{property.rooms || "N/A"}</span>
              <span className="text-sm text-gray-500">Camere</span>
            </div>
            <div className="flex flex-col items-center">
              <Bath className="w-8 h-8 text-primary mb-2" />
              <span className="font-semibold">{property.bathrooms || "N/A"}</span>
              <span className="text-sm text-gray-500">Băi</span>
            </div>
            <div className="flex flex-col items-center">
              <Ruler className="w-8 h-8 text-primary mb-2" />
              <span className="font-semibold">
                {property.area} m²
              </span>
              <span className="text-sm text-gray-500">Suprafață</span>
            </div>
            <div className="flex flex-col items-center">
              <Building className="w-8 h-8 text-primary mb-2" />
              <span className="font-semibold">{property.type}</span>
              <span className="text-sm text-gray-500">Tip proprietate</span>
            </div>
          </div>

          {/* Additional Details */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Detalii suplimentare</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                <li className="flex items-center">
                  <Calendar className="w-5 h-5 mr-3 text-primary" />
                  An construcție: <strong>{property.yearBuilt || "N/A"}</strong>
                </li>
                <li className="flex items-center">
                  <Building className="w-5 h-5 mr-3 text-primary" />
                  Etaj: <strong>{property.floor ?? "N/A"} / {property.totalFloors ?? "N/A"}</strong>
                </li>
                <li className="flex items-center">
                  <ParkingCircle className="w-5 h-5 mr-3 text-primary" />
                  Parcare: <strong>{property.parking ? "Da" : "Nu"}</strong>
                </li>
                <li className="flex items-center">
                  <Tag className="w-5 h-5 mr-3 text-primary" />
                  Clasa energetică: <strong>{property.energyClass || "N/A"}</strong>
                </li>
                <li className="flex items-center">
                  <Eye className="w-5 h-5 mr-3 text-primary" />
                  Vizualizări: <strong>{property.viewsCount}</strong>
                </li>
                <li className="flex items-center">
                  <Heart className="w-5 h-5 mr-3 text-primary" />
                  Contactări: <strong>{property.contactCount}</strong>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Description */}
          {property.description && (
            <PropertyDescription description={property.description} />
          )}

          {/* Amenities */}
          {property.amenities && property.amenities.length > 0 && (
            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Facilități</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {property.amenities.map((amenity) => (
                    <li key={amenity} className="flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
                      {amenity}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            {property.agent && <AgentContact agent={property.agent} />}
            <div className="mt-8">
              <RelatedProperties
                currentPropertyId={property.id}
                city={property.city}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
