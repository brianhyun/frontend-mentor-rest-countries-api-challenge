import axios from "axios";

export const fetchDataWithRetries = async (url, retries = 3) => {
  try {
    const response = await axios.get(url, {
      timeout: 5000,
    });

    return response.data;
  } catch (error) {
    if (retries > 0) {
      console.log(`Retrying... (${3 - retries + 1})`);

      return fetchDataWithRetries(url, retries - 1);
    } else {
      throw new Error("Max retries reached");
    }
  }
};
