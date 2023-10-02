import axios from "axios";

//you have to change the ip address because the previous one points to the emulator itself
const allJobsUrl = "http://192.168.1.35:8000/api/v1/jobs";

export const getAllJobs = async () => {
  const headers = {
    "Content-Type": "application/json",
  };
  try {
    const response = await (await axios.get(allJobsUrl, { headers })).data;
    // console.log(response.data.jobs);
    return response.data.jobs;
  } catch (error) {
    console.log(error.message);
  }
};
