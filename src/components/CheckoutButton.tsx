'use client';

import { db } from "@/firebase";
import { useSubscriptionStore } from "@/store/store";
import { addDoc, collection } from "@firebase/firestore";
import { Loader2Icon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import ManageAccountButton from "./ManageAccountButton";

const CheckoutButton = () => {

    const { data: session } = useSession();
    const [loading, setLoading] = useState(false);
    const subscription = useSubscriptionStore((state) => state.subscription);

    const isLoadingSubscription = subscription === undefined;
    const isSubscribed = subscription?.status === "active" && subscription?.role === "pro"

    // TODO: revamp the issubscrobed condition

    const createCheckoutSession = async () => {
        if (!session?.user.id) return;

        // push a document into firebase database
        setLoading(true);

        const docRef = await addDoc(collection(db, 'customers', session.user.id, 'checkout_sessions'), {
            price: 'price_1O0998KDjTc6FlwiIL3eBoYQ',
            success_url: window.location.origin,
            cancel_url: window.location.origin,
        })

        setLoading(false);
    };

    // ... stripe extension on firebase will create a checkout session

    // redirect user to the checkout page

    console.log('creating payment checkout session!');

    return (
        <div className='flex flex-col space-y-2'>
            {/* susbscribed? */}
            {isSubscribed && (
                <>
                    <hr className="mt-5" />
                    <p className="pt-5 text-center text-xs text-indigo-600">
                        You are subscribed to PRO
                    </p>
                </>
            )}


            <div
                className='mt-8 block rounded-md bg-indigo-600 px-3.5 py-2 text-center text-sm font-semibold 
                leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2
                focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer disabled:opacity-80
                disabled:bg-indigo-600/50 disabled:text-white disabled:cursor-default '>
                {isSubscribed ? (
                    <ManageAccountButton />
                ) : isLoadingSubscription || loading ? (
                    <Loader2Icon className="h-4 w-4 animate-spin" />
                ) : (
                    <button onClick={() => { createCheckoutSession() }}>Sign Up</button>
                )}
            </div>
        </div>
    )
}

export default CheckoutButton