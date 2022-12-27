import { User } from "@prisma/client";
import prisma from "../../config/database";
import { hashPassword } from "../../config/jwt";
import { UserInput, UserResponse } from "../schemas/user.schema";

// create
export async function create(data: UserInput): Promise<UserResponse> {
     const { password, ...rest } = data;

     const { hash, salt } = hashPassword(password);

     const user = await prisma.user.create({
          data: { ...rest, salt, password: hash },
          select: {
               id: true,
               email: true,
               name: true,
               created_at: true,
               updated_at: true
          }
     });
     return user;
}

// find by email
export async function findByEmail(email: string): Promise<User | null> {
     const data = await prisma.user.findUnique({ where: { email } });
     return data;
}

// find by id
export async function findById(id: string): Promise<UserResponse | null> {
     const data = await prisma.user.findUnique({
          where: { id },
          select: {
               id: true,
               email: true,
               name: true,
               created_at: true,
               updated_at: true
          }
     });
     return data;
} 