import axios from "axios";

export const donate = async (donation: any) => {
  const result = await axios.post("/api/donate", { ...donation });

  return result;
};
