import { User } from "@prisma/client";
import prisma from "../../config/database";
import { hashPassword } from "../../config/jwt";
import { UserInput } from "../schemas/user.schema";



// create
export async function create(data: UserInput): Promise<User> {
     const { password, ...rest } = data;

     const { hash, salt } = hashPassword(password);

     const user = await prisma.user.create({
          data: { ...rest, salt, password: hash },
     });

     return user;
}

// find by email
export async function findByEmail(email: string): Promise<User | null> {
     const data = await prisma.user.findUnique({ where: { email } });
     return data;
}

// find by id
export async function findById(id: string): Promise<User | null> {
     const data = await prisma.user.findUnique({ where: { id } });
     return data;
} 