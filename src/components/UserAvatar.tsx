import {
    Avatar,
    AvatarFallback,
} from "@/components/ui/avatar"
import { cn } from "@/lib/utils";
import Image from "next/image";

const UserAvatar = ({
    name,
    image,
    className
}: {
    name?: string | null;
    image?: string | null;
    className?: string | null;
}) => {
    return (
        <Avatar className={cn('bg-white text-base', className)}>
            {
                image && (
                    <Image
                        src={image}
                        alt={name || "User's name"}
                        width={40}
                        height={40}
                        referrerPolicy="no-referrer"
                        className="rounded-full"
                    />
                )
            }
            <AvatarFallback
                delayMs={1000}
                className="dark:bg-white dark:text-black text-lg"
            >
                {
                    name?.split(' ').map((n) => n[0]).join('')
                }
            </AvatarFallback>
        </Avatar>
    )
}

export default UserAvatar