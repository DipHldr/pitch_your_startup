import { defineType,defineField } from "sanity";
import { FolderIcon } from "lucide-react";
export const startup=defineType({
    name:"startup",
    title:'Startups',
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
        name:'author',
        type:'reference',
        to:{type:'author'}
       }),
       defineField({
        name:'views',
        type:'number'
       }),
       defineField({
        name:'description',
        type:'text'
       }),
       defineField({
        name:'category',
        type:'string',
        validation:(Rule)=>Rule.min(1).max(20).required().error("please enter a category")
       }),
       defineField({
        name:'image',
        type:'url',
        validation:(Rule)=>Rule.required().error("image required")
       }),
       defineField({
        name:'pitch',
        type:'markdown'
       }),
    ],
    
})