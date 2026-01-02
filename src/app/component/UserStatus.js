// src/app/components/UserStatus.js
import { auth } from "../config/auth";

export default async function UserStatus() {
  const session = await auth();

 return session;
}