import ArticleRow from './ArticleRow'
import { asyncComponent } from '@/utils/lib'
import { getContentByID } from '@/utils/cache'

interface ArticleRowProps {
    id: string
}

const ArticleRowServer = asyncComponent(async (props: ArticleRowProps) => {
    const { id } = props
    const topic = await getContentByID(id)

    return <ArticleRow topic={topic} />
})

export default ArticleRowServer
