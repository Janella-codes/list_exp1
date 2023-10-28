
import TodosComponent from '@/components/todo-component';
import prisma from '@/lib/prisma'






export default async function TodosPage() {
  'use server'

    const todos = await prisma.todo.findMany();



    return (
        <main className='flex min-h-screen flex-col items-center w-full p-24'>
            <h1 className='text-4xl font-bold'>Todos</h1>

          <TodosComponent todos={todos}/>
        </main>
    );
};

