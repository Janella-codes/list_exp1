
import Link from 'next/link'


export default function first() {
    return (
        <div>
            This is the first page.
            <br />
            {/* Adding the Link Component */}
            <Link href="/first">
                <a><button>Go to First Page</button></a>
            </Link>
            <br />
            <Link href="/second">
                <a><button>Go to Second Page</button></a>
            </Link>
        </div>
    )
}