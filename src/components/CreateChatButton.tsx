'use client';

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { useSession } from "next-auth/react";
import { Ghost, Loader2, MessageSquarePlusIcon } from "lucide-react";
import { useState } from "react";
import { useSubscriptionStore } from "@/store/store";
import { useToast } from "./ui/use-toast";
import { v4 as uuidv4 } from 'uuid';
import { addChatRef, chatMembersCollectionGroupRef } from "@/lib/converters/ChatMembers";
import { serverTimestamp, setDoc, getDocs } from "@firebase/firestore";
import { ToastAction } from "./ui/toast";

const CreateChatButton = ({ isLarge }: { isLarge?: boolean }) => {

    const { data: session } = useSession();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const { toast } = useToast()
    const subcription = useSubscriptionStore((state) => state.subscription);


    const createNewChat = async () => {
        if (!session?.user.id) return;
        setLoading(true);
        toast({
            title: "Creating new chat",
            description: "Please wait...",
            duration: 10000
        });

        // TODO: Check if the user is pro and limit them creating a new chat!
        const noOfChats = (
            await getDocs(chatMembersCollectionGroupRef(session.user.id))
        ).docs.map((doc) => doc.data()).length;

        //check if the user is not about to exceed the limit FREE plan which is 3 chats
        const isPro = subcription?.role === "pro" && subcription.status === "active";

        if (!isPro && noOfChats >= 3) {
            toast({
                title: "Free plan limit exceeded",
                description: "You have reached the limit of 3 chats. Please upgrade to PRO plan to continue adding users to chats!",
                variant: "destructive",
                action: (
                    <ToastAction
                        altText="Upgrading to PRO plan"
                        onClick={() => router.push("/register")}
                    >
                        Upgrade to PRO
                    </ToastAction>
                )
            })

            setLoading(false);
            return;
        }

        //generate unique ID
        const chatId = uuidv4();

        // Add the chat detail to the database
        await setDoc(addChatRef(chatId, session.user.id), {
            userId: session.user.id!,
            email: session.user.email!,
            timestamp: serverTimestamp(),
            isAdmin: true,
            chatId: chatId,
            image: session.user.image || ""
        }).then(() => {
            toast({
                title: "Success",
                description: "Your chat has been created!",
                className: "bg-green-600 text-white",
                duration: 2000,
            });
            router.push(`/chat/${chatId}`);
        }).catch(err => {
            console.error(err);
            toast({
                title: "Error",
                description: "There was an error creating your chat!",
                variant: "destructive",
                duration: 2000,
            });
        }).finally(() => {
            setLoading(false);
        });

        router.push("/chat/abc");
    };

    if (isLarge)
        return (
            <Button onClick={createNewChat} variant={"ghost"}>
                {loading ? <Loader2 className="w-8 h-8 animate-spin" /> : "Create New Chat"}
            </Button>
        );

    return (
        <Button onClick={createNewChat} variant={"ghost"}>
            <MessageSquarePlusIcon />
        </Button>
    );
}

export default CreateChatButton;