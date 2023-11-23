import { authOptions } from '@/auth';
import ChatInput from '@/components/ChatInput';
import ChatMessages from '@/components/ChatMessages';
import { sortedMessageRef } from '@/lib/converters/Message';
import { getDocs } from 'firebase/firestore';
import { getServerSession } from 'next-auth';
import { simulatedMessages } from '@/lib/data';
import ChatMembersBadges from '@/components/ChatMembersBadges';
import AdminControls from '@/components/AdminControls';
import { chatMembersRef } from '@/lib/converters/ChatMembers';
import { redirect } from 'next/navigation';

type Props = {
    params: {
        chatId: string,
    };
};

const ChatPage = async ({ params: { chatId } }: Props) => {

    // get the current user server session
    const session = await getServerSession(authOptions);

    // get already saved messages from the datastore
    //const initialMessages = (await getDocs(sortedMessageRef(chatId))).docs.map((doc) => doc.data());

    const hasAccess = (await getDocs(chatMembersRef(chatId))).docs
        .map((doc) => doc.data())
        .includes(session?.user.id!);

    if (!hasAccess) redirect('/chat?error=permission');

    return (
        <>
            <AdminControls chatId={chatId} />
            <ChatMembersBadges chatId={chatId} />

            <div className='flex-1'>
                <ChatMessages
                    chatId={chatId}
                    session={session}
                    initialMessages={simulatedMessages}
                />
            </div>
            <ChatInput chatId={chatId} />
        </>
    );
}

export default ChatPage