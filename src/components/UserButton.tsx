"use client"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import UserAvatar from "./UserAvatar"
import { Session } from "next-auth"
import { Button } from "./ui/button"
import { signIn, signOut } from "next-auth/react"
import { useSubscriptionStore } from "@/store/store"
import { Loader2, StarIcon } from "lucide-react"
import ManageAccountButton from "./ManageAccountButton"


const UserButton = ({ session }: { session: Session | null }) => {

    const subscription = useSubscriptionStore((state) => state.subscription);

    if (!session) {
        return (
            <Button variant={"outline"} onClick={() => signIn()}>
                Sign in
            </Button>

        )
    }

    return session && (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <UserAvatar
                    name={session.user?.name}
                    image={session.user?.image}
                />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>{session.user?.name}</DropdownMenuLabel>
                <DropdownMenuSeparator />

                {subscription === undefined && (
                    <DropdownMenuItem>
                        <Loader2 className="w-8 h-8 animate-spin" />
                    </DropdownMenuItem>
                )}

                {subscription?.role === "isPro" && (
                    <>
                        <DropdownMenuLabel className="text-xs flex items-center justify-center space-x-1 text-[#E935c1] animate-pulse">
                            <StarIcon className="h-6 w-6" fill="#E935c1" />
                            <p>PRO</p>
                        </DropdownMenuLabel>

                        <DropdownMenuSeparator />

                        <DropdownMenuItem>
                            <ManageAccountButton />
                        </DropdownMenuItem>
                    </>
                )}
                <DropdownMenuItem onClick={() => signOut()}>Sign Out</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

    )
}

export default UserButton