import Link from 'next/link'
import Image from 'next/image'
import { LogOut } from 'lucide-react';
import { BadgePlus } from 'lucide-react';
import { Avatar } from './ui/avatar';
import { AvatarImage } from './ui/avatar';
import { AvatarFallback } from './ui/avatar';
// import { auth } from '@/auth'
import { auth, signOut, signIn } from "@/auth";
// import { signIn, signOut } from 'next-auth/react'

const Navbar = async () => {
    const session=await auth()

  return (
    <header className='px-5 py-3 bg-white shadow-sm font-work-sans'>
        <nav className='flex justify-between items-center'>
            <Link href="/">
            <Image src="/logo.png" alt="logo" width={144} height={30}/>
            </Link>

            <div className='flex items-center gap-5 text-black'>
                {session && session?.user ? (
                    <>
                    <Link href="/startup/create">
                    <span className='max-sm:hidden'>Create</span>
                    <BadgePlus className='size-6 sm:hidden'/>
                    
                    </Link>

                    <form action={async ()=>{
                        "use server";
                        await signOut({redirectTo:"/"})
                    }}>
                        <button type="submit"><span className='max-sm:hidden'>Logout</span>
                        <LogOut className="size-6 sm:hidden text-red-500" />
                        </button>
                        
                    </form>
                    <Link href={`/user/${session?.id}`}>
                    <Avatar className='size-10'>
                        <AvatarImage 
                         src={session?.user?.image || ''}
                         alt={session?.user?.image || ''} />
                        <AvatarFallback>AV</AvatarFallback>
                    </Avatar>
                    </Link>
                    </>
                ):(
                    <form action={async ()=>{
                        "use server";
                       await signIn('github');
                    }}>
                        <button type="submit">
                            Login
                        </button>
                    </form>
                )}
            </div>
        </nav>
    </header>
  )
}

export default Navbar
