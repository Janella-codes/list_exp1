

import Pic from '@/components/ProfilePic';
import { SideNav } from '@/components/SideNav';

import PostComponent from '@/components/new/UI';
import UI from '@/components/new/UI';
import Pyramid from '@/components/pyramid';
import TodosComponent from '@/components/todo-component';
import prisma from '@/lib/prisma'
import { User } from '@clerk/nextjs/dist/types/server';

import { addHobby5 } from "@/actions/action";

type Time = {
  datetime: string;
}

type Repository = {
  name: string;
  description: string;
  html_url: string;
}



async function getTime(): Promise<Time> {
  const res = await fetch(
    'https://worldtimeapi.org/api/timezone/America/New_York',
    {
      next: {
        revalidate: 5,
      },
    }
  );
  return res.json();
}

async function getRepo(): Promise<Repository> {
  const res = await fetch(
    'https://api.github.com/repos/vercel/next.js'
  );
  return res.json();
}



export default async function TodosPage() {
  'use server'

  const todos = await prisma.todo.findMany();


  const [data, time] = await Promise.all([getRepo(), getTime()]);

  return (
    <>
      <header className='sticky top-0 z-10 border-b bg-slate-100 pt-2'>
        <h1 className='mb-2 px-4 text-lg font-bold'>Home</h1>
      </header>
      <div className='container mx-auto flex items-start'>
        <SideNav />
      </div>
      <main className='flex min-h-screen flex-col items-center w-full p-24'>
        <h1 className='text-4xl font-bold'>{data.name}</h1>
        <p className='text-lg'>{time.datetime}</p>
        <h1 className='text-4xl font-bold'>Todos</h1>
        <Pic />
        
        
        <TodosComponent todos={todos} />
    
      





      
      </main>
    </>
  );
}
