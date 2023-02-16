import bcrypt from 'bcrypt'
import mongoose from 'mongoose'

const SALT_ROUNDS = 10

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: { type: String, required: true, trim: true, minlength: 8 },
    isAdmin: { type: Boolean, required: true, default: false },
    refreshToken: [{ type: String }],
  },
  { timestamps: true }
)

userSchema.pre('save', async function () {
  if (!this.isModified('password')) return
  this.password = await bcrypt.hash(this.password, SALT_ROUNDS)
})

userSchema.statics.authenticate = async function (email, password) {
  const user = await this.findOne({ email }).exec()

  if (!user || !(await bcrypt.compare(password, user.password)))
    throw new Error('Wrong username or password.')

  return user
}

export const User = mongoose.model('user', userSchema)
