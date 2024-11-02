import { defineType,defineField } from "sanity";
import { FolderIcon } from "lucide-react";
export const playlist=defineType({
    name:"playlist",
    title:'Playlist',
    type:'document',
    icon:FolderIcon,
    fields:[
        defineField({
         name:'title',
         type:'string'
        }),
       defineField({
        name:'slug',
        type:'slug',
        options:{
            source:'title'
        }
       }),
       defineField({
        name:'select',
        type:'array',
        of:[{type:'reference',to:[{type:"startup"}]}]
       }),
       
    ],
    
})