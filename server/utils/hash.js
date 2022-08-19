import bcrypt from "bcryptjs";

export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(process.env.SALT_ROUND)
  
  const hash = bcrypt.hash(password, salt)

  return hash
}
