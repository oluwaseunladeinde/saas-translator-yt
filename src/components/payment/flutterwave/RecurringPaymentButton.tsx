'use client'
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';

const generate_tx_reference = () => {
    return Math.floor(Math.random() * 10000000000000000);
}


const FlutterwaveRecurringPaymentButton = () => {

    const config = {
        public_key: process.env.FLUTTER_PUBLIC_KEY!,
        tx_ref: Date.now().toLocaleString(),
        amount: 100,
        currency: 'NGN',
        payment_options: "card",
        payment_plan: process.env.FLUTTER_RECURRING_PLAN_ID!,
        customer: {
            email: 'user@gmail.com',
            phone_number: '070********',
            name: 'john doe',
        },
        meta: {
            consumer_id: "7898",
            consumer_mac: "kjs9s8ss7dd"
        },
        customizations: {
            title: 'Translator Chat Pay',
            description: 'Subscribe to use the Transalator chat application',
            logo: '@logos/chatanyone.svg',
        },
    }

    const handleFlutterPayment = useFlutterwave(config);

    const callingPayment = async () => {

        console.log("Activating flutter payment...");

        try {
            await handleFlutterPayment({
                callback: (response) => {
                    console.log(response);
                    if (response.status === 'completed') {

                    }
                    closePaymentModal() // this will close the modal programmatically
                },
                onClose: () => {
                    console.log("Event triggered to close the modal")
                },
            });
        } catch (error) {
            console.error(error)
        }
        console.log("Payment exited");
    }

    return (
        <>
            <button
                className='mt-8 block rounded-md bg-indigo-600 px-3.5 py-2 text-center text-sm font-semibold 
                leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2
                focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer disabled:opacity-80
                disabled:bg-indigo-600/50 disabled:text-white disabled:cursor-default '
                onClick={callingPayment}
            >
                Make Payment
            </button>
        </>
    )
}



export default FlutterwaveRecurringPaymentButton