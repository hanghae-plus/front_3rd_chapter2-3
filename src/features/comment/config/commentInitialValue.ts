import { User } from "@entities/user/model"
import { Comment } from "@entities/comment/model"

export const commentInitialValue = {
  user: {
    id: -1,
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    age: 0,
    phone: "",
    image: "",
    address: { 
      address: "", 
      city: "", 
      state: "" 
    },
    company: { 
      name: "", 
      title: "" 
    },
  } as User,
  
  comment: {
    id: -1,
    postId: -1,
    body: "",
    likes: 0,
    user: {
      id: -1,
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      age: 0,
      phone: "",
      image: "",
      address: { 
        address: "", 
        city: "", 
        state: "" 
      },
      company: { 
        name: "", 
        title: "" 
      },
    },
  } as Comment,
}