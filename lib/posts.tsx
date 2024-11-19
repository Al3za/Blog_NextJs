import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark'
import html from 'remark-html'

const postsDirectory = path.join(process.cwd(), 'blogPosts');

export function getSortedPostsData() {
    // Get file names under /posts
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames.map((fileName) => {
        // Remove ".md" from file name to get id
        const id = fileName.replace(/\.md$/, '');

        // Read markdown file as string
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');

        // Use gray-matter to parse the post metadata section
        const matterResult = matter(fileContents);

      //  console.log(matterResult,'matterResult')

        const blogPost: BlogPost = {
            id,
            title: matterResult.data.title,
            date: matterResult.data.date,
        }

       // console.log(blogPost,'blogPost');

        // Combine the data with the id
        return blogPost
    });
    // Sort posts by date
    return allPostsData.sort((a, b) => a.date < b.date ? 1 : -1);
};


export async function getPostData(id: string) {

    const fullPath = path.join(postsDirectory, `${id}.md`); // id is the name of the file
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    // we read the file under the given path above

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    const processedContent = await remark() 
        .use(html) // remark html make markdown file readeble and so can we render it as html.
        .process(matterResult.content); // matterResult = matter(fileContents); start with content: data 
    // thats why we use matterResult.content

    const contentHtml = processedContent.toString();

    const blogPostWithHTML: BlogPost & { contentHtml: string /* we add new TS paameters here*/ } = {
        id,
        title: matterResult.data.title,
        date: matterResult.data.date,
        contentHtml,
    };

    // Combine the data with the id
    return blogPostWithHTML
}