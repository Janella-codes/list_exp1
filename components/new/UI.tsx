"use client"


import { addHobbyToPost } from "@/actions/action";
import React, { useRef, useState } from "react";
import { useUser } from "@clerk/nextjs";

type Hobby = {
  id: number;
  hobby: string;
};

type HobbyComponentProps = {
  hobbies: Hobby[];
};

export default function UI({ hobbies }: HobbyComponentProps) {
  const { user } = useUser();
  const userId = user ? user.id : null;

  const ref = useRef<HTMLFormElement>(null);
  const [optimisticHobbies, addOptimisticHobby] = useState(hobbies);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(ref.current as HTMLFormElement);
    const hobby = formData.get('hobby') as string;

    addOptimisticHobby((prevHobbies) => [
      ...prevHobbies,
      { id: Math.random(), hobby },
    ]);

    if (userId) {
      await addHobbyToPost(formData, userId);
    }
  };

  return (
    <>
      <form ref={ref} onSubmit={handleSubmit} className='flex flex-col w-[300px] m-16 gap-2 border-b px-4 py-2'>
        <input
          placeholder="hobby this week"
          type='text'
          name='hobby'
        />
        <button type='submit'>Submit your hobby</button>
      </form>

      <ul className='list-disc'>
        {optimisticHobbies.map((hobby) => (
          <li key={hobby.id}>
            <p>{hobby.hobby}</p>
          </li>
        ))}
      </ul>
    </>
  );
}



/*
type Post = {
    id: number;
    hobby: string;
}


type PostComponentProps = {

    posts: Post[];
}

export default function PostComponent({
    posts }: PostComponentProps) {
        const ref = useRef<HTMLFormElement>(null);
        const [optimisticTodos, addOptimisticTodo] 
        = useOptimistic(posts, (state, newTodo: Post) => {
            return [...state, newTodo];
        });

    return (
        <><form ref={ref} action={async formData =>{
            ref.current?.reset();

            addOptimisticTodo({ 
                id: Math.random(),
                hobby: formData.get('hobby') as string,
            });
            // input validation here
           await addPost(formData);
        }} className='flex flex-col w-[300px] m-16 gap-2 border-b px-4 py-2'>
         
      <input
        placeholder="Post"
        type='text'
        name='hobby'
      />
        <Button/>
    </form>
        

            <ul className='list-disc'>
{optimisticTodos.map((post) => (
    <li key={post.id}>
       
        <p>{post.hobby}</p>
    </li>
))}

</ul>
</>
    )

}


type Hobby = {
    id: number;
    hobby: string;
}


type HobbyComponentProps = {

    hobbies: Hobby[];
}



export default function UI ({
    hobbies }: HobbyComponentProps) {
        const session = useSession();
        const ref = useRef<HTMLFormElement>(null);
        const [optimisticHobbies, addOptimisticHobby] 
        = useOptimistic(hobbies, (state, newHobby: Hobby) => {
            return [...state, newHobby];
        });

    return (
        <><form ref={ref} action={async formData =>{
            ref.current?.reset();

            addOptimisticHobby({ 
                id: Math.random(),
                hobby: formData.get('hobby') as string,
            });

              await addHobby(formData);
        }} className='flex flex-col w-[300px] m-16 gap-2 border-b px-4 py-2'>
        <input
            placeholder="hobby this week"
          type='text'
          name='hobby'
        />
        <button type='submit'>Submit your hobby</button>

        <Button/>
      </form>

  <ul className='list-disc'>
{optimisticHobbies.map((post) => (
    <li key={session.data.user.id ?? ''}>
       
        <p>{post.hobby}</p>
    </li>
))}

</ul>
</>
    )

}


/*export default function UI({ addHobby } : { addHobby: any }) {

  return (
    <form action={addHobby}>
      <input
        value={'soccer3'}
        type='text'
        name='hobby'
      />
      <button type='submit'>Submit your hobby</button>
    </form>
  )
}*/

// export default function UI({ addHobby } : { addHobby: any }) {