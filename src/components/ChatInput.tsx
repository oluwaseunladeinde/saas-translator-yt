'use client';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { User, limitedMessageRef, messagesRef } from '@/lib/converters/Message';
import { addDoc, getDocs, serverTimestamp } from '@firebase/firestore';
import { useRouter } from 'next/navigation';
import { useSubscriptionStore } from '@/store/store';
import { useToast } from './ui/use-toast';
import { ToastAction } from './ui/toast';

const formSchema = z.object({
    input: z.string().max(1000),

})

const ChatInput = ({ chatId }: { chatId: string }) => {

    const router = useRouter();
    const { data: session } = useSession();
    const subscription = useSubscriptionStore((state) => state.subscription);
    const { toast } = useToast()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            input: '',
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {

        const inputCopy = values.input.trim();
        form.reset();

        if (values.input.length === 0) {
            return;
        }

        if (!session?.user) {
            return;
        }

        const sentMessagesLength = (await getDocs(limitedMessageRef(chatId))).docs.map((doc) => doc.data()).length;
        const isPro = subscription?.role === "pro" && subscription.status === "active";

        if (!isPro && sentMessagesLength >= 20) {
            toast({
                title: "Free plan the limit exceeded",
                description: "You've exceeded the FREE plan limit of 20 messages per chat. Upgrade to PRO for unlimited chat messages!",
                variant: "destructive",
                duration: 5000,
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

        // create the user data payload
        const userToStore: User = {
            id: session.user.id!,
            name: session.user.name!,
            email: session.user.email!,
            image: session.user.image || "",
        };

        // add the chat message to the datastore
        addDoc(messagesRef(chatId), {
            input: inputCopy,
            timestamp: serverTimestamp(),
            user: userToStore,
        });
    };

    return (
        <div className='sticky bottom-8'>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='flex space-x-2 p-2 rounded-t-xl max-w-4xl mx-auto bg-white border dark:bg-slate-800'
                >
                    <FormField
                        name='input'
                        control={form.control}
                        render={({ field }) => (
                            <FormItem className='flex-1'>
                                <FormControl>
                                    <Input
                                        className='border-none bg-transparent dark:placeholder:text-white/70'
                                        placeholder='Enter message in ANY language...'
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button
                        type='submit'
                        className='flex-shrink-0 px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-b-xl hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
                        SEND
                    </Button>
                </form>
            </Form>
        </div>
    )
}

export default ChatInput