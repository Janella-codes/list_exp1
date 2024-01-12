import Image from 'next/image';

import v3 from '../dq_girls3.jpg';
import v4 from '../sweeter_dress_12_28_2021.png';
import v5 from '../veronica1.jpg';

export default function Pic() {
    return (
        <div>
            <div style={{ display: 'flex' }}>
                <h1>My Homepage</h1>
                <p>My name is Donald Duck.</p>
            </div>
            <div style={{ display: 'flex' }}>
    


                <Image
                    src={v3}
                    width={100}
                    height={100}
                    object-fit='cover'
                    alt="Picture of the author"
                />
                <Image
                    src={v4}
                    width={100}
                    height={100}
                    object-fit='cover'
                    alt="Picture of the author"
                />
                   <Image
                    src={v5}
                    width={100}
                    height={100}
                    object-fit='cover'
                    alt="Picture of the author"
                />
            </div>
        </div>
    )
}