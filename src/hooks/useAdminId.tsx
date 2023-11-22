'use client';
import { chatMemberAdminRef } from "@/lib/converters/ChatMembers";
import { getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

type Props = {}

const useAdminId = ({ chatId }: { chatId: string }) => {

    const userId = "BoXea0MtZ8Vsdq7UXuDW";

    const [adminId, setAdminId] = useState<string>("");

    useEffect(() => {
        // const fetchAdminStatus = async () => {
        //     const adminId = (await getDocs(chatMemberAdminRef(chatId))).docs.map((doc) => doc.id)[0];
        //     setAdminId(adminId);
        // };

        // fetchAdminStatus();
        setAdminId(userId);
    }, [chatId])

    return adminId;
}

export default useAdminId