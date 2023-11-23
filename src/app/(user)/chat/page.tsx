import ChatList from "@/components/ChatList";
import ChatPermissionError from "@/components/ChatPermissionError";

type Props = {
    params: {};
    searchParams: {
        error: string;
    };
};

const ChatsPage = ({ searchParams: { error } }: Props) => {
    return (
        <div>
            {error && (
                <div className="m2">
                    <ChatPermissionError />
                </div>
            )}
            <ChatList />
        </div>
    )
}

export default ChatsPage