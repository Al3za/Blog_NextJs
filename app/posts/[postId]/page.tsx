import React from 'react';
import { notFound } from 'next/navigation';
import { getPostData, getSortedPostsData } from '@/lib/posts';
import getFormattedDate from '@/lib/getFormattedDate';
import Link from 'next/link';


type Params = {
    params: {
        postId: string
    }
};

export function generateMetadata({ params: { postId} }:Params) {
    
    // params {postId} are = to the name of the @lib folder file without the final .md (pre-rendering or ssg-ssr)
    const posts = getSortedPostsData();
    const post = posts.find(postItem => postItem.id === postId);//remember to use the triple === tecken in those comparasons; (Just one ll give back wrong data)
   
    // console.log(post,'post',postId);

    if (!post) {
        return {
            title: 'post not found'
        }
    };
    
    return {
        title: post?.title
    };

    // check the how to make a more friendly SEO metadata in the future
};

export default async function PropsPostPage({ params: { postId} }:Params) {
    
    // params {postId} are = to the name of the @lib folder file without the final .md (pre-rendering or ssg-ssr)
    const posts = getSortedPostsData();
    const checkPost = posts.find((item) => item.id === postId); // remember to use the triple === tecken in those comparasons;

    if (!checkPost) {
        return notFound();
    }
    
    console.log(posts.find(item=> item.id === postId),'check data')
    
    const { title, date, contentHtml } = await getPostData(postId);

    const pubDate = getFormattedDate(date);
    // whe use the data to formatt the data
  
    return (
     
    <main className="px-6 prose prose-xl prose-slate prose-invert mx-auto">
    <h1 className="text-3xl mt-4 mb-0">{title}</h1>
    <p className="mt-0">
        {pubDate}
    </p>
    <article>
                <section dangerouslySetInnerHTML={{ __html: contentHtml }} />
                {/* this section part transform hou contet markup to html */}
        <p>
            <Link href="/">← Back to home</Link>
        </p>
    </article>
</main>
  )
};


export function generateStaticParams(){
    
    const getMarkupFiles =  getSortedPostsData();

   return getMarkupFiles.map((item) => {
         item.id.toString();
    });
};
