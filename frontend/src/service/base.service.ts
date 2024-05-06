import instance from "../api/axios.config";

export type Success = {
  success: string;
}

export type Error = {
  error: string;
}

export type BaseEntityData = {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export function getRequest<T>(url: string): Promise<T | Error> {
  return instance.get(url).then((response) => response.data).catch((error) => {
    console.error(error);
    return { error: error.message };
  });
}

export function postRequest<T>(url: string, data: unknown): Promise<T | Error> {
  return instance.post(url, data).then((response) => response.data).catch((error) => {
    console.error(error);
    return { error: error.message };
  });
}

export function putRequest<T>(url: string, data: unknown): Promise<T | Error> {
  return instance.put(url, data).then((response) => response.data).catch((error) => {
    console.error(error);
    return { error: error.message };
  });
}

export function deleteRequest<T>(url: string): Promise<T | Error> {
  return instance.delete(url).then((response) => response.data).catch((error) => {
    console.error(error);
    return { error: error.message };
  });
}