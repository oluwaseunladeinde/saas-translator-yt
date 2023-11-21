"use client"
import { subscriptionRef } from "@/lib/converters/Subscription";
import { useSubscriptionStore } from "@/store/store";
import { onSnapshot } from "@firebase/firestore";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const SubscriptionProvider = ({ children }: { children: React.ReactNode }) => {

    const { data: session } = useSession();
    const setSubscription = useSubscriptionStore(
        (state) => state.setSubscription
    );

    useEffect(() => {

        // return onSnapshot(subscriptionRef(session?.user.id), (snapshot) => {
        //     if(snapshot.empty){
        //         console.log("User has NO subscription");
        //         return;
        //     }
        // });

        if (!session) {
            setSubscription(null)
            return;
        } else {
            //TODO: handle subscription properly using the chosen gateway flow
            // 3:10 
            setSubscription(session.user.id)
        }

    }, [session, setSubscription])


    return (
        <>{children}</>
    )
}

export default SubscriptionProvider