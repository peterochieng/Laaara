import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import PropertyDetails from "./PropertyDetails";
import { useState } from "react";

const fetchProperties = async () => {
  const { data } = await axios.get(
    "https://laara-api-dev-3rc4fb3npa-ew.a.run.app/search/stays/filtered",
    {
      headers: { "x-app-id": "3a2f3e5b-4a89-4fcb-a7e1-31421c7a6344" },
    }
  );
  console.log(data);
  return data;
};

const PropertyList = () => {
  const {
    data: properties,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["properties"],
    queryFn: fetchProperties,
  });

  const [selectedProperty, setSelectedProperty] = useState(null);

  if (isLoading) return <div>Loading properties...</div>;
  if (error) return <div>Error loading properties: {error.message}</div>;

  return (
    <div>
      <h1>Laara Group Property List</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "20px",
        }}
      >
        {properties?.data?.map((property) => (
          <div
            key={property.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "15px",
              cursor: "pointer",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            }}
            onClick={() => setSelectedProperty(property.id)}
          >
            <img
              src={
                property.propertyImages?.[0]?.images?.url ||
                "https://via.placeholder.com/300"
              }
              alt={property.name}
              style={{
                width: "100%",
                height: "200px",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
            <h2>{property.name}</h2>
            <p>{property.description}</p>
            <p>
              <strong>Location:</strong> {property.address.town},{" "}
              {property.address.city}, {property.address.country}
            </p>
            <p>
              <strong>Reviews:</strong>{" "}
              {property._count.reviews || "No reviews yet"}
            </p>
          </div>
        ))}
      </div>

      {selectedProperty && (
        <div style={{ marginTop: "20px" }}>
          <h2>Selected Property Details</h2>
          <PropertyDetails propertyId={selectedProperty} />
        </div>
      )}
    </div>
  );
};

export default PropertyList;
