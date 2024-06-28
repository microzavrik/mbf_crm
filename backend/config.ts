export const config = {
    jwtSecret: process.env.JWT_SECRET || "USMANOV_SECRET_KEY_TEST",
    port: process.env.PORT || 3000,
  };