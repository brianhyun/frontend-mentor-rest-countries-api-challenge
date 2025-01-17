import axios from "axios";

export const fetchDataWithRetries = async (url, retries = 3) => {
  try {
    const response = await axios.get(url);

    return response.data;
  } catch (error) {
    if (retries > 0) {
      console.log(`Retrying... (${3 - retries + 1})`);

      return fetchDataWithRetries(url, retries - 1);
    } else {
      console.error("Error fetching data:", error.message);
      if (error.response) {
        console.error("Status:", error.response.status);
        console.error("Headers:", error.response.headers);
        console.error("Data:", error.response.data);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Axios setup error:", error.message);
      }

      throw new Error("Max retries reached");
    }
  }
};
