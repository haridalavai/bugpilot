import { auth } from "@clerk/nextjs/server";

export const getToken = async () => {
  const { getToken } = await auth();
  const token = await getToken({
    template: "logpilot_jwt",
  });

  if (!token) {
    throw new Error("No token found");
  }

  return token;
};
