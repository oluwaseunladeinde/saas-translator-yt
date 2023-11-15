'use client';

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Ghost, MessageSquarePlusIcon } from "lucide-react";

const CreateChatButton = () => {

    const router = useRouter();

    const createNewChat = async () => {
        router.push("/chat/abc");
    };

    return (
        <Button onClick={createNewChat} variant={"ghost"}>
            <MessageSquarePlusIcon />
        </Button>
    );
}

export default CreateChatButton;