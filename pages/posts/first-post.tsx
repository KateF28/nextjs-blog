import Layout from '@components/layout'
import Meta from '@components/meta'

export default function FirstPost() {
    return (
        <Layout home={false}>
            <Meta title="First Post" />
            <h1>First Post</h1>
        </Layout>
    )
}