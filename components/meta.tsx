import Head from 'next/head'

interface IMetaProps {
    title?: string
    keywords?: string
    description?: string
}

const Meta = ({title, keywords, description}: IMetaProps) => {
    return (
        <Head>
            <meta name='viewport' content='width=device-width, initial-scale=1' />
            <meta name='keywords' content={keywords} />
            <meta name='description' content={description} />
            <meta charSet="utf-8" />
            <meta
                property="og:image"
                content={`https://og-image.vercel.app/${encodeURI(
                    "Next.js Sample Website"
                )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
            />
            <meta name="og:title" content={title ?? 'Next.js Sample Website'} />
            <meta name="twitter:card" content="summary_large_image" />
            <link rel="icon" href="/favicon.ico" />
            <title>{title ?? 'Next.js Sample Website'}</title>
        </Head>
    )
}

Meta.defaultProps = {
    keywords: "learn next.js, next.js sample",
    description: "Learn how to build a personal website using Next.js"
}

export default Meta