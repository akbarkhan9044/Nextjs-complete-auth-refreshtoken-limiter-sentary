import { SignJWT } from "jose";

// Standard Practice: Use TextEncoder to prepare the secret for the library
const SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function signJWT(payload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" }) // Set algorithm to HMAC SHA256
    .setIssuedAt()
    .setExpirationTime("1m") // Token expires in 2 hours
    .sign(SECRET);
}

const REFRESH = new TextEncoder().encode(process.env.REFRESH);

export async function signJWTRefresh(payload) {
    return await new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" }) // Set algorithm to HMAC SHA256
      .setIssuedAt()
      .setExpirationTime("2h") // Token expires in 2 hours
      .sign(REFRESH);
  }