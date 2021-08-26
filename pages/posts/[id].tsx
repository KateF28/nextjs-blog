import { InferGetStaticPropsType, GetStaticPaths } from 'next'
import Head from 'next/head'
import Layout from '@components/layout'
import Date from '@components/date'
import { getAllPostIds, getPostData, IPostData } from '../../lib/posts'
import utilStyles from '../../styles/utils.module.css'

interface IPostContentData extends IPostData {
    contentHtml: string
}

interface IPostPath {
    params: {
        id: string
    }
}

export const getStaticPaths: GetStaticPaths = async () => {
    // paths: [{ params: { id: 'id1' } }, ...] - a list of possible value for id
    const paths: IPostPath[] = getAllPostIds()
    return {
        paths,
        fallback: false
    }
}

export const getStaticProps = async ({params}: IPostPath) => {
    // Fetch necessary data for the blog post (with id) using params.id and return it as props
    const postData: IPostContentData = await getPostData(params.id)
    return { props: { postData } }
}

export default function Post({ postData }: InferGetStaticPropsType<typeof getStaticProps>) {
    return <Layout>
        <Head>
            <title>{postData.title}</title>
        </Head>
        <article>
            <h1 className={utilStyles.headingXl}>{postData.title}</h1>
            <div className={utilStyles.lightText}>
                <Date dateString={postData.date} />
            </div>
            <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        </article>
    </Layout>
}
