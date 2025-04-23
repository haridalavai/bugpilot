import { apiClient } from "./apiClient";
import { API_ENDPOINTS } from "./api-endpoints";
import { Issue } from "@/src/components/issues/issues-data-table/issues-data-columns";
import { auth } from "@clerk/nextjs/server";

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
  const { getToken } = await auth();
  const token = await getToken({
    template: "logpilot_jwt",
  });
  if (!token) {
    throw new Error("No token found");
  }
  const response = await apiClient.get(API_ENDPOINTS.ISSUES, params, {
    Authorization: `Bearer ${token}`,
  });

  return response;
};
