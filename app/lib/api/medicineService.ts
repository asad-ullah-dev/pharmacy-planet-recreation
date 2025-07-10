import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";
const authToken = localStorage.getItem("token");

export const getAllMedicines = async () => {
  try {
    const response = await axios.get(BASE_URL+ "/admin/medicines", {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    console.log(response,'response')
    return response.data?.data?.medicines || []; // nested `data.data`
  } catch (error) {
    console.error("Error fetching medicines:", error);
    throw error;
  }
};
export const createMedicine = async (data: any) => {
  const response = await axios.post(BASE_URL + "/admin/medicines", data, {
    headers: {
      Authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json",
    },
  });

  return response.data;
};

export const getMedicineById = async (id: number) => {
const response = await axios.get(`${BASE_URL}/admin/medicines/${id}`, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });

  return response.data.data; // ✅ nested .data
};

export async function updateMedicine(id: number, updatedData) {
  const response = await axios.put(`${BASE_URL}/admin/medicines/${id}`, updatedData, {
    headers: {
       Authorization: `Bearer ${authToken}`,
    },
  });
   console.log(response,'response')

  return response.data;
}

export const deleteMedicine = async (id: number) => {
  const response = await axios.delete(`${BASE_URL}/admin/medicines/${id}`, {
    headers: {
       Authorization: `Bearer ${authToken}`,
    },
  });
  console.log(response,'response')
  return response.data;
};