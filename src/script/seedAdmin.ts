import { auth } from "../lib/auth";
import { prisma } from "../lib/prisma";
import { UserRole } from "../middlewares/auth";

async function seedAdmin() {
  try {
    const adminData = {
      name: "Admin Saheb",
      email: "admin1@admin.com",
      role: UserRole.ADMIN,
      password: "admin1234",
    };

    // check user exist on db or not

    const existingUser = await prisma.user.findUnique({
      where: {
        email: adminData.email,
      },
    });

    if (existingUser) {
      throw new Error("User already exists!");
    }

    const signUpAdmin = await fetch(
      `${process.env.BETTER_AUTH_URL}/api/auth/sign-up/email`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Origin: process.env.APP_URL as string,
        },
        body: JSON.stringify(adminData),
      },
    );

    console.log("Admin user created successfully:", signUpAdmin);
  } catch (error) {
    console.log(error);
  }
}

seedAdmin();
