import { getVerificationTokenByEmail } from "@/utils/verification-token";
import { v4 as uuidv4 } from "uuid";
import { prisma } from "@/lib/database";

export const generateVerificationToken = async (email: string) => {
  // Create the token
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 2 * 60 * 60 * 1000); // 2 hours

  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await prisma.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const verificationToken = await prisma.verificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return verificationToken;
};
