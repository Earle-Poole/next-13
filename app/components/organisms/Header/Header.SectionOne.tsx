import Link from 'next/link'

const SectionOne = () => {
    return (
        <section className="flex items-center flex-1 gap-4">
            <Link
                href="/"
                className="bg-gray-500 hover:bg-gray-400 text-white font-bold py-2 px-4 border-b-4 border-gray-700 hover:border-gray-500 rounded"
            >
                Home
            </Link>
        </section>
    )
}

export default SectionOne
