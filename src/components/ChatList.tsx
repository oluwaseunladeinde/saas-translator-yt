import { authOptions } from '@/auth'
import { chatMembersCollectionGroupRef } from '@/lib/converters/ChatMembers'
import { getDocs } from '@firebase/firestore'
import { getServerSession } from 'next-auth'
import ChatListRows from './ChatListRows'

const ChatList = async () => {

    const session = await getServerSession(authOptions);

    const chatsSnapshot = await getDocs(
        chatMembersCollectionGroupRef(session?.user.id!)
    );


    const initialChats = chatsSnapshot.docs.map((doc) => ({
        ...doc.data,
        //timestamp: null,
    }))

    // return <ChatListRows initialChats={initialChats} />
    return <p>Chat List Here</p>
}

export default ChatList