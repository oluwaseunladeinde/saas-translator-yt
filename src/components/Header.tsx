import Logo from "./Logo"
import UserButton from "./UserButton"
import DarkModeToggle from "./DarkModeToggle"
import { getServerSession } from "next-auth"
import { authOptions } from "@/auth"
import Link from "next/link"
import { MessageSquareIcon } from "lucide-react"
import CreateChatButton from "./CreateChatButton"


const Header = async () => {

    const session = await getServerSession(authOptions)

    return (
        <header className="sticky top-0 z-50 bg-white dark:bg-gray-900">
            <nav className="flex flex-col sm:flex-row items-center p-5 pl-2 bg-white dark:bg-gray-900 max-w-7xl mx-auto">
                <Logo />

                <div className="flex-1 flex items-center justify-end space-x-4">
                    {/* Language Select */}

                    {session ? (
                        <>
                            <Link
                                href={'/chat'}
                                prefetch={false}
                                referrerPolicy="no-referrer"
                            >
                                <MessageSquareIcon className="text-black dark:text-white" />
                            </Link>
                            <CreateChatButton />
                        </>
                    ) : (
                        <>
                            <Link href={'/pricing'}>Pricing</Link>
                        </>
                    )}

                    <DarkModeToggle />
                    <UserButton session={session} />
                </div>
            </nav>
        </header>
    )
}

export default Header