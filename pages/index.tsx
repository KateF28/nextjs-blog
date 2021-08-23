import Head from 'next/head'
import Link from 'next/link'
import { GetStaticProps } from 'next'
import Layout, { siteTitle } from '../components/layout'
import Date from '../components/date'
import { getSortedPostsData } from '../lib/posts'
import utilStyles from '../styles/utils.module.css'
import {PostsDataType} from "../lib/posts"

export const getStaticProps: GetStaticProps = async (context) => {
    const allPostsData: PostsDataType = getSortedPostsData()
    return {
        props: { allPostsData }
    }
}

interface IHomePageProps {
    allPostsData: PostsDataType
}

export default function Home({ allPostsData }: IHomePageProps) {
  return (
      <Layout home>
        <Head>
          <title>{siteTitle}</title>
        </Head>
        <section className={utilStyles.headingMd}>
          <p>Hello, I'm Kate. I'm a front-end developer. You can contact me on <a href="https://www.linkedin.com/in/kateryna-fedorova-job-applicant-profile/" rel="noopener noreferrer" target="_blank">LinkedIn</a></p>
          <p>
            (This is a sample website - you’ll be building a site like this on{' '}
            <a href="https://nextjs.org/learn" rel="noopener noreferrer" target="_blank">Next.js tutorial</a>.)
          </p>
          <h1 className="title">
            Read{' '}
            <Link href="/posts/first-post">
              <a rel="noopener noreferrer" target="_blank">this page!</a>
            </Link>
          </h1>
          <div>
            <a rel="noopener noreferrer" target="_blank" href="https://github.com/vercel/next.js/tree/master/examples">
              <h3>Examples &rarr;</h3>
              <p>Discover and deploy boilerplate example Next.js projects.</p>
            </a>
          </div>
        </section>
          <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
              <h2 className={utilStyles.headingLg}>Blog</h2>
              <ul className={utilStyles.list}>
                  {allPostsData.map(({ id, date, title }) => (
                      <li className={utilStyles.listItem} key={id}>
                          <Link href={`/posts/${id}`}>
                              <a>{title}</a>
                          </Link>
                          <br />
                          <small className={utilStyles.lightText}>
                              <Date dateString={date} />
                          </small>
                      </li>
                  ))}
              </ul>
          </section>
      </Layout>
  )
}
