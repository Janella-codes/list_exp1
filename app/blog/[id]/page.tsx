import Link from "next/link";

export async function generateMetadata({ params }: { params: { id: string } }) {
    return {
       title: `Blog Post ${params.id}`,
    };
}


export default function page3({ params }: 
    { params: { id: string }
    }) {
    return (
        <html lang="en">
            <body>
                <div>
                    <h1>ID: {params.id}</h1>

                    <Link href="/">
                        <div>My Card</div>
                    </Link>
                </div>
            </body>
        </html>

    )
}