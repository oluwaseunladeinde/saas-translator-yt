
import { Dispatch, SetStateAction } from 'react'
import { Copy } from 'lucide-react';
import { Button } from './ui/button';
import {
    Dialog,
    DialogClose,
    DialogTrigger,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogContent,
    DialogFooter
} from "./ui/dialog";
import { useToast } from './ui/use-toast';
import { Input } from './ui/input';
import { Label } from './ui/label';

const ShareLink = ({ isOpen, setIsOpen, chatId }: {
    isOpen: boolean;
    chatId: string;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
    const { toast } = useToast();
    const host = window.location.host;
    const linkToChat = process.env.NODE_ENV === 'development' ? `http://${host}/chat/${chatId}` : `https://${host}/chat/${chatId}`;

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(linkToChat);
            console.log("Text copied to clipboard");

            toast({
                title: "Link Copied Successfully",
                description: "Share this with the person you want to chat with! (NOTE: They must be added to the chat list to access it)",
                className: "bg-green-600 text-white",
                duration: 3000,
            });
        } catch (error) {
            console.error("Failed to copy text", error);
        }
    }

    return (
        <>
            <Dialog
                open={isOpen}
                onOpenChange={(open) => setIsOpen(open)}
                defaultOpen={isOpen}
            >
                <DialogTrigger asChild>
                    <Button variant={'outline'}>
                        <Copy className="mr-2" />
                        Share Link
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Share Link</DialogTitle>
                        <DialogDescription>
                            Any user who has been{" "} <span className="text-indigo-600 font-bold">granted access</span>{" "} can use this link!
                        </DialogDescription>
                    </DialogHeader>

                    <div className='flex items-center space-x-2'>
                        <div className='grid flex-1 gap-2'>
                            <Label htmlFor='link' className='sr-only'>Link</Label>
                            <Input id='link' defaultValue={linkToChat} readOnly />
                        </div>
                        <Button onClick={() => copyToClipboard()} className="px-3" size="sm">
                            <span className='sr-only'>Copy Link</span>
                            <Copy className='h-4 w-4' />
                        </Button>

                    </div>
                    <DialogFooter className='sm:justify-start'>
                        <DialogClose asChild>
                            <Button type='button' variant='secondary'>Close</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default ShareLink