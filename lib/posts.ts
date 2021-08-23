import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'

export interface IPostData {
    id: string
    date: string
    title: string
}
export type PostsDataType = IPostData[]

const postsDirectory = path.join(process.cwd(), 'posts')

export function getPostDataWoHTML(id: string) {
    // Read markdown file as string
    const fullPath = path.join(postsDirectory, `${id}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    return matter(fileContents)
}

export async function getPostData(id: string) {
    // async keyword was added to getPostData because we need to use await for remark.
    // That means we need to update getStaticProps in pages/posts/[id].js to use await when calling getPostData
    const matterResult: matter.GrayMatterFile<string> = getPostDataWoHTML(id)

    // Use remark to convert markdown into HTML string
    const processedContent = await remark()
        .use(html)
        .process(matterResult.content)
    const contentHtml = processedContent.toString()

    // Combine the data with the id and contentHtml
    return {
        id,
        contentHtml,
        title: matterResult.data.title,
        date: matterResult.data.date,
    }
}

export function getSortedPostsData() {
    // Get file names under /posts
    const fileNames = fs.readdirSync(postsDirectory)
    const allPostsData: PostsDataType = fileNames.map(fileName => {
        // Remove ".md" from file name to get id
        const id = fileName.replace(/\.md$/, '')
        const matterResult: matter.GrayMatterFile<string> = getPostDataWoHTML(id)

        return {
            id,
            date: matterResult.data.date,
            title: matterResult.data.title,
        }
    })

    // Sort posts by date
    return allPostsData.sort(({ date: a }, { date: b }) => {
        if (a < b) {
            return 1
        } else if (a > b) {
            return -1
        } else {
            return 0
        }
    })
}

export function getAllPostIds() {
    // Get file names under /posts
    const fileNames = fs.readdirSync(postsDirectory)

    // Returns [
    //   { params: { id: 'ssg-ssr' } },
    //   { params: { id: 'pre-rendering' } }
    // ]
    // otherwise, getStaticPaths will fail.
    return fileNames.map(fileName => {
        return {
            params: {
                id: fileName.replace(/\.md$/, '')
            }
        }
    })
}