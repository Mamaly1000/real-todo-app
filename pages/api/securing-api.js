import { getSession } from "next-auth/react";

export default async function Handler(req, res) {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({
      message: "You are not logged in",
    });
  }
  return res.status(200).json({
    message: session,
  });
}
