import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

export const getAllMedicines = async () => {
  let authToken = null;
  if (typeof window !== "undefined") {
    authToken = localStorage.getItem("token");
  }
  try {
    const response = await axios.get(BASE_URL+ "/admin/medicines", {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data?.data?.medicines || [];
  } catch (error) {
    console.error("Error fetching medicines:", error);
    throw error;
  }
};

export const createMedicine = async (data: any) => {
  let authToken = null;
  if (typeof window !== "undefined") {
    authToken = localStorage.getItem("token");
  }
  const response = await axios.post(BASE_URL + "/admin/medicines", data, {
    headers: {
      Authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json",
    },
  });

  return response.data;
};

export const getMedicineById = async (id: number) => {
  let authToken = null;
  if (typeof window !== "undefined") {
    authToken = localStorage.getItem("token");
  }
  const response = await axios.get(`${BASE_URL}/admin/medicines/${id}`, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });

  return response.data.data;
};  
  
export async function updateMedicine(id: number, updatedData) {
  let authToken = null;
  if (typeof window !== "undefined") {
    authToken = localStorage.getItem("token");
  }
  const response = await axios.put(`${BASE_URL}/admin/medicines/${id}`, updatedData, {
    headers: {
       Authorization: `Bearer ${authToken}`,
    },
  });
   console.log(response,'response')

  return response.data;
}

export const deleteMedicine = async (id: number) => {
  let authToken = null;
  if (typeof window !== "undefined") {
    authToken = localStorage.getItem("token");
  }
  const response = await axios.delete(`${BASE_URL}/admin/medicines/${id}`, {
    headers: {
       Authorization: `Bearer ${authToken}`,
    },
  });
  console.log(response,'response')
  return response.data;
};