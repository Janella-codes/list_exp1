"use client"

import { FC } from "react";

// Define the props type
interface HobbyComponentProps {
  addHobby5: (formData: FormData) => Promise<void>;
}



 
export const UI: FC<HobbyComponentProps> = ({ addHobby5 }) => {
 
  return (
    <form action={addHobby5}>
      <input
        value={'soccer'}
        type='text'
        name='hobby'
      />
      <button type='submit'>Submit your hobby</button>
    </form>
  )
}