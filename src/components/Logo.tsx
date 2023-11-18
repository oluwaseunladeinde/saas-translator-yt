"use client"
import Link from "next/link"
import LogoImage from '@logos/chatwithanyone_logo.svg';
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import Image from "next/image";

const Logo = () => {
    return (
        <Link href='/' prefetch={false} className='overflow-hidden'>
            <div className="flex items-center w-72 h-14">
                <AspectRatio ratio={16 / 9} className="flex items-center justify-center">
                    <Image
                        priority
                        src={LogoImage}
                        alt='logo'
                        className="dark:filter dark:invert"
                    />
                </AspectRatio>
            </div>
        </Link>
    )
}

export default Logo