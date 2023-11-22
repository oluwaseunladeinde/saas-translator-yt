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
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useToast } from "./ui/use-toast";
import useAdminId from "@/hooks/useAdminId";
import { useSubscriptionStore } from "@/store/store";
import { ToastAction } from "./ui/toast";
import { useRouter } from "next/navigation";

const DeleteChat = ({ chatId }: { chatId: string }) => {

    const { data: session } = useSession();
    const { toast } = useToast();
    const adminId = useAdminId({ chatId });
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const subscription = useSubscriptionStore((state) => state.subscription);

    const handleDelete = async () => {
        toast({
            title: "Deleting Chat",
            description: "Please wait while we delete the chat...",
            duration: 5000,
        });
        console.log("Deleting :: ", chatId);
    };

    return (
        session?.user.id === adminId && (
            <>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button variant="destructive">
                            Delete Chat
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle>Are you sure?</DialogTitle>
                            <DialogDescription>
                                This will delete the chat for all users.
                            </DialogDescription>
                        </DialogHeader>
                        <div className='grid grid-cols-2 space-x-2'>
                            <Button variant={"destructive"} onClick={handleDelete}>
                                Delete
                            </Button>
                            <Button variant={"outline"} onClick={() => setOpen(false)}>
                                Cancel
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </>
        )
    )
}

export default DeleteChat