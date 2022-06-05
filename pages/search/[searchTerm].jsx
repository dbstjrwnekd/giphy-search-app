import Head from "next/head"
import { useRouter } from "next/router"
import Link from "next/link"
import Footer from "../../components/Footer"

export default function Search(initalData) {
    const router = useRouter()
    return (
        <>
            <Head>
                <title>Search results for: {router.query.searchTerm}</title>
                <meta name="description" content={initialData.giphys.map((each, index) => each.title + ' ')}></meta>
                <link rel="icon" href="/favicon.ico" />
                <link rel="stylesheet" href="/styles.css" />
            </Head>
            
            <p>Go <Link href="/"><a>home</a></Link></p>
            <h1>Search results for: {router.query.searchTerm}</h1>

            <div className="giphy-search-results-grid">
                {initalData.giphys.data.map((each, index) => {
                    return (
                        <div key={index}>
                            <h3>{each.title}</h3>
                            <img src={each.images.original.url} alt={each.title} />
                        </div>
                    )
                })}
            </div>
            <Footer />
        </>
    )
}

export async function getServerSideProps(context) {
    const searchTerm = context.query.searchTerm
    let giphys = await fetch(`https://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=Msvyoo4ZItZUaNo6lA7mL7uvmtwCn0sp&limit=6`)
    giphys = await giphys.json()
    return {props: {giphys: giphys}}
}
