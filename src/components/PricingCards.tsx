import { CheckCircleIcon, CheckIcon } from "lucide-react";
import Link from "next/link";
import CheckoutButton from "./CheckoutButton";
import FlutterwaveRecurringPaymentButton from "./payment/flutterwave/RecurringPaymentButton";

const tiers = [
    {
        name: "Starter",
        id: null,
        href: "#",
        priceMonthly: null,
        description: "Start chatting with anyone, anywhere!",
        features: [
            "20 messages chat limit in chats",
            "2 particpants limit in chats",
            "3 chat room limit",
            "Support 2 languages only",
            "48-hour support response time",
        ]
    },
    {
        name: "Pro",
        id: "si_OnlcsLNQYbMVzV",
        href: "#",
        priceMonthly: "N6500.00",
        description: "Unlock the full potential with Pro!",
        features: [
            "Unlimited messages in chats",
            "Unlimited particpants limit in chats",
            "Unlimited chat rooms",
            "Multimedia support in chats (coming soon)",
            "1-hour, dedicated support response time",
            "Early access to new features",
        ]
    },
];

const PricingCards = ({ redirect }: { redirect: boolean }) => {

    return (
        <div>
            <div className="mx-auto grid grid-cols-1 max-w-md gap-8 lg:max-w-4xl lg:grid-cols-2 ">
                {tiers.map((tier) => (
                    <div
                        key={tier.id}
                        className="flex flex-col justify-between rounded-3xl bg-white p-8 shadow-xl ring-1 ring-gray-900/10 sm:p-10"
                    >
                        <div>
                            <h3
                                id={tier.id + tier.name}
                                className="text-base font-semibold leading-7 text-indigo-600"
                            >
                                {tier.name}
                            </h3>
                            <div
                                className="mt-4 flex items-baseline gap-x-2"
                            >
                                {tier.priceMonthly ? (
                                    <>
                                        <span className="text-5xl font-bold tracking-tight text-gray-900">
                                            {tier.priceMonthly}
                                        </span>
                                        <span className="text-base font-semibold leading-7 text-gray-600">
                                            /month
                                        </span>
                                    </>
                                ) : (
                                    <>
                                        <span className="text-5xl font-bold tracking-tight text-gray-900">
                                            Free
                                        </span>
                                    </>
                                )}
                            </div>
                            <p className="mt-6 text-base leading-7 text-gray-600">
                                {tier.description}
                            </p>
                            <ul
                                role="list"
                                className="mt-10 space-y-4 text-sm leading-6 text-gray-600">
                                {tier.features.map((feature) => (
                                    <li
                                        key={feature}
                                        className="flex gap-x-3 items-center">
                                        <CheckIcon
                                            className="flex-none h-6 w-5 text-indigo-600"
                                            aria-hidden="true"
                                        />
                                        <span className="ml-1">
                                            {feature}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        {redirect ? (
                            <Link href='/register' className="mt-8 block rounded-md bg-indigo-600 px-3.5 py-2 text-center text-sm 
                            font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2
                            focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer disabled:opacity-80">
                                Get Started Today
                            </Link>

                        ) : (
                            tier.id && (
                                <CheckoutButton />
                                /*<FlutterwaveRecurringPaymentButton />*/
                            )
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PricingCards