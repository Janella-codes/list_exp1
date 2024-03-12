import TodosPage2 from "@/components/new/newpage";
import { UserButton, useSession } from "@clerk/nextjs";

import Link from "next/link";



export function SideNav() {

    
    return (
    <nav className="sticky top-0 px-2 py-4">
        <ul className="flex flex-col items-start gap-2 whitespace-nowrap">
            <li>
            <UserButton />
            </li>
            <li>
                <Link href="/">
                        <span className="flex items-center gap-4">
                          {/*home icon*/}
                        <span className="hidden text-lg md:inline">Home</span>
                        </span>
                 
                    </Link>
           </li>
 
                <li>
                <Link href='/firstPage'>
                        <span className="flex items-center gap-4">
                            {/*account icon*/}
                        <span className="hidden text-lg md:inline">Profile</span>
                        </span>
                  
                    </Link>
                </li>

                <li>
                <Link href='/about'>
                        <span className="flex items-center gap-4">
                            {/*account icon*/}
                        <span className="hidden text-lg md:inline">about</span>
                        </span>
                  
                    </Link>
                </li>
                <li>
                <Link href='/blog/123'>
                        <span className="flex items-center gap-4">
                            {/*account icon*/}
                        <span className="hidden text-lg md:inline">blog</span>
                        </span>
                  
                    </Link>
                </li>
      
      
        </ul>
    </nav>
    );
}


