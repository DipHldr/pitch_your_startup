import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import { AUTHOR_BY_GITHUB_ID_QUERY } from "./sanity/lib/queries"
import { client } from "@/sanity/lib/client"
import { writeClient } from "./sanity/lib/write-client"

// Define the custom types for GitHub's user and profile fields
interface GitHubUser {
  name: string;
  email: string;
  image: string;
}

interface GitHubProfile {
  id: number;
  login: string;
  bio: string;
}

 
export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub],
  callbacks:{
    async signIn(
      {user:{name,email,image},
      profile:{id,login,bio}
    }:{user:GitHubUser,profile:GitHubProfile}){
      const existingUser=await client.withConfig({useCdn:false}).fetch(AUTHOR_BY_GITHUB_ID_QUERY,{id});

      if(!existingUser){
        await writeClient.create({
          _type:'author',
          id,
          name,
          username:login,
          email,
          image,
          bio:bio || "",
        });
      }
      return true;
    },
    async jwt({token,account,profile}:{token:{id:string},account:string,profile:GitHubProfile}){
      if(account && profile){
        const user=await client.withConfig({useCdn:false}).fetch(AUTHOR_BY_GITHUB_ID_QUERY,{
          id:profile?.id,
        });

        token.id = user?._id;

      }
      return token;
    },
    async session({session,token}:{session:{user:{name:string,email:string,image:"string"},expires:string,id:string},token:{id:string}}){
      Object.assign(session,{id:token.id});
      return session
    }
  }
})

