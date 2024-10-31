import { User } from "@entities/user/model"

export const authorValue = {
  initial: {
    id: -1,
    age: 0,
    phone: "",
    username: "",
    firstName: "",
    lastName: "",
    address: { address: "", city: "", state: "" },
    company: { name: "", title: "" },
    email: "",
    image: "",
  } as User
} 