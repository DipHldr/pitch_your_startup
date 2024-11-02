import React from 'react'
import { STARTUPS_BY_AUTHOR_QUERY } from '@/sanity/lib/queries'
import { client } from '@/sanity/lib/client'
import StartupCard, { StartTypeCard } from './StartupCard'
const UserStartups =async ({id}:{id:string}) => {

    const startups=await client.fetch(STARTUPS_BY_AUTHOR_QUERY,{id})
  return (
    <>
      {startups.length>0 ? startups.map((startup:StartTypeCard)=>(
        <StartupCard key={startup._id} post={startup} />
      )):(
        <p className='no-result'>
            No Posts Yet
        </p>
      )}
    </>
  )
}

export default UserStartups
