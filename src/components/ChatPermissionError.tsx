import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Button } from "./ui/button";
import Link from 'next/link';

const ChatPermissionError = () => {
    return (
        <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription className="flex">
                <p className="flex-1">
                    You do not have permission to access this chat.
                    <span className="font-bold">Ask the chat admin to add you.</span>
                </p>
                <Link href="/chat" replace>
                    <Button variant="destructive">Dismiss</Button>
                </Link>
            </AlertDescription>
        </Alert>

    )
}

export default ChatPermissionError