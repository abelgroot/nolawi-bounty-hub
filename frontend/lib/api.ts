import axios from "axios";
import * as humps from "humps";
import { z } from "zod";

export interface ApiResult<T> {
  data: T;
  status: number;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export async function apiGet<T>(
  url: string,
  schema: z.ZodSchema<T>,
  authToken?: string,
  headers?: Record<string, string>,
): Promise<ApiResult<T>> {
  const finalHeaders = {
    ...{ "Content-Type": "application/json" },
    ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
    ...headers,
  };

  const response = await axios.get<T>(API_URL + url, {
    headers: finalHeaders,
    timeout: 60000,
  });
  const data: T = humps.camelizeKeys(response.data) as T;
  const validatedData = schema.parse(data);

  return {
    data: validatedData,
    status: response.status,
  };
}

export async function apiPost<T>(
  url: string,
  schema: z.ZodSchema<T>,
  payload: object,
  authToken?: string,
  headers?: Record<string, string>,
): Promise<ApiResult<T>> {
  const finalHeaders = {
    "Content-Type": "application/json",
    ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
    ...headers,
  };

  const response =
    payload instanceof FormData
      ? await axios.postForm(API_URL + url, payload, { headers: finalHeaders })
      : await axios.post(API_URL + url, payload, { headers: finalHeaders });

  const data: T = humps.camelizeKeys(response.data) as T;
  const validatedData = schema.parse(data);

  return {
    data: validatedData,
    status: response.status,
  };
}

interface ApiDeleteResult {
  status: number;
}

export async function apiDelete(
  url: string,
  authToken?: string,
  headers?: Record<string, string>,
): Promise<ApiDeleteResult> {
  const finalHeaders = {
    "Content-Type": "application/json",
    ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
    ...headers,
  };

  const response = await axios.delete(API_URL + url, { headers: finalHeaders });

  return {
    status: response.status,
  };
}
