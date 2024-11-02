import Image from "next/image";
import SearchForm from "@/components/SearchForm";
import StartupCard from "@/components/StartupCard";
import { client } from "@/sanity/lib/client";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";
import { StartTypeCard } from "@/components/StartupCard";
import { sanityFetch } from "@/sanity/lib/live";
import { SanityLive } from "@/sanity/lib/live";
import { auth } from "@/auth";
export default async function Home({searchParams}:{
  searchParams:Promise<{query?:string}>
}) {
  const query=(await searchParams).query;
  const params={search:query||null};
  const session =await auth();
  // console.log(session?.id);
  // console.log(session);
  // const posts=await client.fetch(STARTUPS_QUERY)
  const {data:posts}=await sanityFetch({query:STARTUPS_QUERY,params})
  // console.log(JSON.stringify(posts,null,2))


  return (
    <>
    <section className="pink_container">
        <h1 className="heading">Pitch Your Startup, <br /> Connect With Entrepreneurs</h1>

        <p className="sub-heading !max-w-3xl">
          Submit Ideas, Vote on Pitches , and Get Noticed in Virtual Competitions
        </p>

        <SearchForm query={query}/>
    </section>
    <section className="section_container">
      <p className="text-30-semibold">
        {query? `Search Results for "${query}"`:`All Startups`}        
      </p>

      <ul className="mt-7 card_grid">
        {
          posts?.length>0 ? (
            posts.map((post:StartTypeCard,index:number)=>(
              <StartupCard key={post?._id} post={post}/>
            ))
          ):(
            <p className="no-result"> No Startups Found</p>
          )
        }
      </ul>

    </section>
    <SanityLive />
    </>
  );
}
