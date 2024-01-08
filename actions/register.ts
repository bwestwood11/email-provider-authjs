"use server";

import * as z from "zod";
import { prisma } from "@/lib/database";
import { RegisterSchema } from "@/schemas";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "@/utils/user";
import { generateVerificationToken } from "@/lib/token";
import { sendVerificationEmail } from "@/lib/resend";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
    //   Check to see if data is valid
  const isValid = RegisterSchema.safeParse(values);
  console.log("isValid", isValid)

// If data is not valid, throw error
  if (!isValid.success) {
    return { error: "Email is not valid"}
  }

//   Destructure values from form
  const { email, password, name } = isValid.data;

//   Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

//   Check to see if user already exists
  const existingUser = await getUserByEmail(email);

//   If user exists, throw error
  if (existingUser) {
    return { error: "User already exists" };
  }

//   Create new user in database
  await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
    },
  });

//   Generate a verification token
const verificationToken = await generateVerificationToken(email);

await sendVerificationEmail(email, verificationToken.token)

  return { success: "Confirmation Email Sent" };
};
