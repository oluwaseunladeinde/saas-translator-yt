import { authOptions } from '@/auth';
import { getServerSession } from 'next-auth';
import React from 'react'

type Props = {}

const ChatPage = async (props: Props) => {
    const session = getServerSession(authOptions);
    return (
        <>

        </>
    );
}

export default ChatPage