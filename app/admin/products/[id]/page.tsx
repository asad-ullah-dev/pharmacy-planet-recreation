"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getMedicineById } from "@/app/lib/api/medicineService";

export default function ProductDetailPage() {
  const params = useParams<{ id: string }>();
  const id = Number(params?.id);

  const [medicine, setMedicine] = useState<any>(null);

  useEffect(() => {
    const fetchMedicine = async () => {
      try {
         const data = await getMedicineById(id);
        setMedicine(data);
      } catch (error) {
        console.error("Error fetching medicine:", error);
      }
    };

    if (!isNaN(id)) fetchMedicine();
  }, [id]);

  if (!medicine) return <p className="p-6">Loading or not found...</p>;

  return (
    <div className="p-6 space-y-2">
      <h1 className="text-2xl font-bold">{medicine.name}</h1>
      <p className="text-gray-700">{medicine.description}</p>
      <p>💷 <strong>Price:</strong> £{medicine.price}</p>
      <p>📦 <strong>Stock:</strong> {medicine.stock}</p>
      <p>🏷️ <strong>Category:</strong> {medicine.category}</p>
      <p>⏳ <strong>Expiry Date:</strong> {medicine.expiry_date}</p>
    </div>
  );
}
