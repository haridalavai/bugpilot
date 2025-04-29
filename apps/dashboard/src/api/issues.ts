import { apiClient } from "./apiClient";
import { API_ENDPOINTS } from "./api-endpoints";
import { Issue } from "@/src/components/issues/issues-data-table/issues-data-columns";
import { getToken } from "@/src/utils/get-token";

export type GetIssuesParams = {
  projectId?: string;
  level?: string;
  type?: string;
  search?: string;
  from?: string;
  to?: string;
  page?: string;
  limit?: string;
};

export const getIssues = async (
  params: GetIssuesParams
): Promise<{
  items: Issue[];
  meta: {
    total: number;
    page: number;
    limit: number;
    hasMore: boolean;
  };
}> => {
  const token = await getToken();
  const response = await apiClient.get(API_ENDPOINTS.ISSUES, params, {
    Authorization: `Bearer ${token}`,
  });

  return response;
};

export const getIssue = async (id: string): Promise<any> => {
  const token = await getToken();
  const response = await apiClient.get(
    `${API_ENDPOINTS.ISSUES}/${id}`,
    {},
    {
      Authorization: `Bearer ${token}`,
    }
  );
  return response;
};
