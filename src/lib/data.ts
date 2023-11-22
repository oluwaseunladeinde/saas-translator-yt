import { Message, User } from '@/lib/converters/Message';
import { ChatMembers } from './converters/ChatMembers';


const user1: User = {
    id: "BoXea0MtZ8Vsdq7UXuDW",
    name: "Oluwaseun Ladeinde",
    email: "james.michael@gmail.com",
    image: "https://i.pravatar.cc/150?img=4",
}

const user2: User = {
    id: "ibblk4htpgs1dq0r9qg",
    name: "Anita Bekoch",
    email: "anita.bekoch@gmail.com",
    image: "https://i.pravatar.cc/150?img=1",
}


export const simulatedMessages: Message[] = [
    {
        id: '1',
        input: 'Hello',
        timestamp: new Date(),
        user: user2,
    },
    {
        id: '2',
        input: 'How are you?',
        timestamp: new Date(),
        user: user1,
    },
    {
        id: '3',
        input: 'I am fine',
        timestamp: new Date(),
        user: user2,
    },
    {
        id: '4',
        input: 'Its nice to meet you',
        timestamp: new Date(),
        user: user1,
    },
];


export const simulatedChatMembers: ChatMembers[] = [
    {
        userId: "BoXea0MtZ8Vsdq7UXuDW",
        email: "james.michael@gmail.com",
        timestamp: new Date(),
        isAdmin: true,
        chatId: "Z8Vsdq7UXuDW",
        image: "https://i.pravatar.cc/150?img=4",
    },
    {
        userId: "ibblk4htpgs1dq0r9qg",
        email: "anita.bekoch@gmail.com",
        timestamp: new Date(),
        isAdmin: false,
        chatId: "Z8Vsdq7UXuDW",
        image: "https://i.pravatar.cc/150?img=1",
    },
    {
        userId: "cnVsaW5nLWxhcmstMzcuY2xl",
        email: "vivian.monday@gmail.com",
        timestamp: new Date(),
        isAdmin: false,
        chatId: "Z8Vsdq7UXuDW",
        image: "https://i.pravatar.cc/150?img=3",
    },
]