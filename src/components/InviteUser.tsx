'use client';

import { Button } from "./ui/button";
import {
    Dialog,
    DialogTrigger,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogContent
} from "./ui/dialog";
import {
    Form,
    FormField,
    FormLabel,
    FormControl,
    FormMessage,
    FormItem
} from "./ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { getDocs, serverTimestamp, setDoc } from "firebase/firestore";
import { addChatRef, chatMembersRef } from "@/lib/converters/ChatMembers";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useToast } from "./ui/use-toast";
import { getuserByEmailRef } from "@/lib/converters/User";
import useAdminId from "@/hooks/useAdminId";
import { PlusCircleIcon } from "lucide-react";
import { useSubscriptionStore } from "@/store/store";
import { ToastAction } from "./ui/toast";
import { useRouter } from "next/navigation";
import { Input } from './ui/input';
import ShareLink from "./ShareLink";

const formSchema = z.object({
    email: z.string().email("Please enter your valid email address"),
});

const InviteUser = ({ chatId }: { chatId: string }) => {
    const { data: session } = useSession();
    const { toast } = useToast();
    const adminId = useAdminId({ chatId });
    const router = useRouter();
    const subscription = useSubscriptionStore((state) => state.subscription);

    const [open, setOpen] = useState(false);
    const [openInviteLink, setOpenInviteLink] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
    });

    const handleSubmit = async (values: z.infer<typeof formSchema>) => {
        if (!session?.user.id) return;

        toast({
            title: "Inviting user...",
            description: "Please wait while we send the invite...",
            duration: 5000,
            action: (
                <ToastAction
                    altText='Close'
                    onClick={() => setOpenInviteLink(false)}
                >
                    Close
                </ToastAction>
            )
        });

        // we need to get the users current chats to check if they re about to exceed the FREE plan
        const noOfUsersInChat = (await getDocs(chatMembersRef(chatId))).docs.map(
            (doc) => doc.data()
        ).length;

        //check if the user is about to exceed the FREE plan which is 2 user in a chat
        const isPro = subscription?.role === "pro" && subscription.status === "active";

        if (!isPro && noOfUsersInChat >= 2) {
            toast({
                title: "Free plan the limit exceeded",
                description: "You've exceeded the FREE plan limit of 3 users in a single chat. Upgrade to PRO for unlimited users to chat messages!",
                variant: "destructive",
                action: (
                    <ToastAction
                        altText='Upgrade'
                        onClick={() => router.push('/register')}
                    >
                        Upgrade to PRO
                    </ToastAction>
                )
            });
            return;
        }

        const querySnapshot = await getDocs(getuserByEmailRef(values.email));
        if (querySnapshot.empty) {
            toast({
                title: "User not found",
                description: "Please enter a valid email address of a registered user OR send teh invitation once they have signed up.",
                variant: "destructive",
                action: (
                    <ToastAction
                        altText='Close'
                        onClick={() => setOpenInviteLink(false)}
                    >
                        Close
                    </ToastAction>
                )
            });
            return;
        } else {

            // get the user data returned from the datastore
            const user = querySnapshot.docs.map((doc) => doc.data())[0];

            // add the user tyo the list of chat memberss
            await setDoc(addChatRef(chatId, user.id), {
                userId: user.id,
                email: user.email!,
                chatId: chatId,
                isAdmin: false,
                timestamp: serverTimestamp(),
                image: user.image || "",
            }).then(() => {
                setOpen(false);
                toast({
                    title: "Added to chat",
                    description: "The user has been added to the chat!",
                    className: "bg-green-600 text-white",
                    duration: 3000,
                });

                setOpenInviteLink(true);
            })
        }

        form.reset();
    }

    return (
        adminId === session?.user.id && (
            <>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <PlusCircleIcon className="mr-1" />
                            Add User To Chat
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle>Add User To Chat</DialogTitle>
                            <DialogDescription>
                                Invite a user to join this chat. {" "} <span className="text-indigo-600 font-bold">(Note: they must be registered)</span>
                            </DialogDescription>
                        </DialogHeader>

                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(handleSubmit)}
                                className="flex flex-col space-y-2">
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input
                                                    className="border-none bg-transparent dark:placeholder:text-white/70"
                                                    placeholder="Email"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button className="ml-auto sm:w-fit w-full" type="submit">
                                    Add To Chat
                                </Button>
                            </form>
                        </Form>
                    </DialogContent>
                </Dialog>

                <ShareLink
                    isOpen={openInviteLink}
                    setIsOpen={setOpenInviteLink}
                    chatId={chatId}
                />
            </>
        )
    )
}

export default InviteUser