'use server'

import { auth, currentUser } from "@clerk/nextjs";
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { revalidatePath } from "next/cache";
import { FC } from "react";


export const addTodo = async (formData: FormData) => {
    
    const prisma = new PrismaClient();
    const name = formData.get('name');
    
    try { 
      
      await prisma.todo.create({
      data: {
        name: name as string,
      },
    });
  } catch (e) {

  }

    revalidatePath("/todos")
  };




  export const addHobbyToPost = async (formData: FormData, userId: string) => {
    const prisma = new PrismaClient();
    const hobby = formData.get('hobby');
  
    try {
      await prisma.post.create({
        data: {
          hobby: hobby as string,
          userId: userId, // associate the post with the user
        },
      });
    } catch (e) {
      console.error(e);
    } finally {
      await prisma.$disconnect();
    }
  }


  export const GetUserHobbies = async (userId: string) => {
    const prisma = new PrismaClient();
  
    try {
      const hobbies = await prisma.post.findMany({
        where: {
          userId: userId,
        },
      });
  
      console.log(hobbies);
      return hobbies;
      

    } catch (e) {
      revalidatePath("/hobbies");
      console.error(e);
      throw e;
    } finally {
      await prisma.$disconnect();
    }
  };



  interface User {
    id: string;
    // Add other properties as necessary
  }

  export const getTodos = async (req: NextApiRequest, res: NextApiResponse) => {
    const prisma = new PrismaClient();
    const user: User | null = await currentUser();
    const userId = user?.id ? parseInt(user.id) : undefined;
  
    try {
     const todos = await prisma.todo.findMany({
        where: {
          id: userId,
        },
      });
      res.json(todos);
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "An error occurred while fetching todos." });
    }
  
    revalidatePath("/todos");
  };



  export const addHobby = async (formData: FormData) => {
    const id = formData.get('id');
    
    const prisma = new PrismaClient();
    
    // Get the current user
    const user = await currentUser();
    
    // Get the user's name
    const name = user?.firstName + ' ' + user?.lastName;
    
    // Query the database for the user's hobby
    const userWithHobby = await prisma.post.findUnique({
      where: {
        id: user?.id ? parseInt(user.id) : undefined, // Convert 'user?.id' from string to number
      },
      select: {
        hobby: true
      }
    });
      const hobby = userWithHobby?.hobby ?? '';

      try { 
        
        await prisma.post.create({
        data: {
          
          userId: name,
          hobby: hobby,
        },
      });
    } catch (e) {
      console.error(e);
    }

      revalidatePath("/hobbies")
  };






  export const getHobby = async () => {
    
    const prisma = new PrismaClient();
    
    // Get the current user
    const user = await currentUser();
    
    // Query the database for the user's hobby
    const userWithHobby = await prisma.post.findUnique({
      where: {
        id: user?.id ? parseInt(user.id) : undefined, // Convert 'user?.id' from string to number
      },
      select: {
        hobby: true
      }
    });
    const hobby = userWithHobby?.hobby ?? '';

    console.log(`The current user's hobby is ${hobby}`);

    // Return the user's id and hobby
    return {
      userId: user?.id,
      hobby: hobby
    };
};



export async function addHobby5(formData: FormData) {
  const user = await currentUser();
 
  if (!user) {
    throw new Error('You must be signed in to use this feature');
  }
 
  const serverData = {
    usersHobby: formData.get("hobby"),
    userId: user.id,
    profileImage: user.profileImageUrl
  };
 
  console.log('add Hobby completed with user details ', serverData);
}



  /*export async function addHobby(formData: FormData) {
    const user = await currentUser();
    const prisma = new PrismaClient();
    const hobby = formData.get('hobby');
   
    if (!user) {
      throw new Error('You must be signed in to use this feature');
    }
   
    const serverData = {
      usersHobby: formData.get("hobby"),
      userId: user.id,
      profileImage: user.profileImageUrl
    };
   
      console.log('add Hobby completed with user details ', serverData);

      try { 
        await prisma.post.create({
          data: {
            hobby: hobby as string,
            UserId: parseInt(user.id), // Convert 'user.id' from string to number
          },
        });
      } catch (e) {

      }

      revalidatePath("/posts")
  };

/*

  export async function addPost(formData: FormData) {
    const user = await currentUser();
    const prisma = new PrismaClient();
    const post = formData.get('post');
   
    if (!user) {
      throw new Error('You must be signed in to use this feature');
    }
   
    const serverData = {
      usersPost: formData.get("post"),
      userId: user.id,
      profileImage: user.profileImageUrl
    };
   
      console.log('add post completed with user details ', serverData);

      try { 
        await prisma.post.create({
          data: {
            hobby: post as string,
            UserId: parseInt(user.id), // Convert 'user.id' from string to number
          },
        });
      } catch (e) {

      }

      revalidatePath("/posts")
  };


  export async function addHobby(formData: FormData) {
    const user = await currentUser();
    const prisma = new PrismaClient();
    const hobby = formData.get('hobby');
   
    if (!user) {
      throw new Error('You must be signed in to use this feature');
    }
   
    const serverData = {
      usersHobby: formData.get("hobby"),
      userId: user.id,
      profileImage: user.profileImageUrl
    };
   
    console.log('add Hobby completed with user details ', serverData);
  
    // Add hobby to the database
    try {
      const newHobby = await prisma.post.create({
        data: {
          hobby: hobby as string,
          userId: (user.id) as string
        }
      });
      console.log('New hobby added: ', newHobby);
    } catch (error) {
      console.error('Error adding hobby: ', error);
    } finally {
      await prisma.$disconnect();
    }
  }*/