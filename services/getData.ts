import axios, { AxiosPromise } from "axios";
import { baseUrl } from "./urlApi";
export const getData = async <T>({
  params,
  endPoint,
  limit = 1000,
  offset = 0,
}: {
  params?: any;
  limit?: number;
  offset?: number;
  endPoint: "pokemon" | string;
}): AxiosPromise<T> => {
  try {
    const data = await axios.get(`${baseUrl}/${endPoint}`, {
      params: {
        ...params,
        limit,
        offset,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
    throw {
      message: `Error: ${error}`,
    };
  }
};
