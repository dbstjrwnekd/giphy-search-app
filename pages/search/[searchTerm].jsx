import Head from "next/head"
import { useRouter } from "next/router"

export default function Search(initalData) {
    const router = useRouter()
    return (
        <>
            <Head>
                <title>Search</title>
                <link rel="icon" href="/favicon.ico" />
                <link rel="stylesheet" href="/styles.css" />
            </Head>
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
        </>
    )
}

export async function getServerSideProps(context) {
    const searchTerm = context.query.searchTerm
    let giphys = await fetch(`https://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=Msvyoo4ZItZUaNo6lA7mL7uvmtwCn0sp&limit=6`)
    giphys = await giphys.json()
    return {props: {giphys: giphys}}
}
