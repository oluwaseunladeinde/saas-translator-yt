
import { PaystackProps } from "react-paystack/dist/types";

type Props = {
    email: string,
    amount: number,
    name: string,
    currency: string | 'NGN',
}

const PaystackPaymentButton = (props: Props) => {


    // const payWithPaystack = (e) => {
    //     e.preventDefault();
    //     let handler = PaystackPop.setup({
    //         key: process.env.PAYSTACK_PUBLIC_KEY, // Replace with your public key
    //         email: props.email,
    //         amount: props.amount,
    //         currency: props.currency,
    //         ref: "" + Math.floor(Math.random() * 1000000000 + 1), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
    //         // label: "Optional string that replaces customer email"
    //         onClose: function () {
    //             alert("Window closed.");
    //         },
    //         callback: function (response) {
    //             let message = "Payment complete! Reference: " + response.reference;
    //             alert(message);
    //         },
    //     });
    //     handler.openIframe();
    // }


    return (
        <div>PaystackPaymentButton</div>
    )
}

export default PaystackPaymentButton

