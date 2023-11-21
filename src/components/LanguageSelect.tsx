'use client';
import { usePathname } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import {
    LanguagesSupported,
    LanguagesSupportedMap,
    useLanguageStore,
    useSubscriptionStore
} from '@/store/store';
import LoaderSpinner from "./LoaderSpinner";
import Link from "next/link";


const LanguageSelect = () => {
    const [language, setLanguage, getLanguages, getNotSupportedLanguages] = useLanguageStore((state) => [
        state.language,
        state.setLanguage,
        state.getLanguages,
        state.getNotSupportedLanguages,
    ]);

    // get user subscription detail
    const subscription = useSubscriptionStore((state) => state.subscription);
    const isPro = subscription?.role === "isPro" && subscription?.status === "active";

    // check that user is on a chat page
    const pathName = usePathname();
    const isChatPage = pathName.includes("/chat");

    return isChatPage && (
        <div>
            <Select
                onValueChange={(value: LanguagesSupported) => setLanguage(value)}
            >
                <SelectTrigger className="w-[150px] text-black dark:text-white">
                    <SelectValue
                        placeholder={LanguagesSupportedMap[language]}
                        className="" />
                </SelectTrigger>

                <SelectContent>
                    {subscription === undefined ? (
                        <LoaderSpinner />
                    ) : (
                        <>
                            {getLanguages(isPro).map((language) => (
                                <SelectItem key={language} value={language}>
                                    {LanguagesSupportedMap[language]}
                                </SelectItem>
                            ))}
                            {getNotSupportedLanguages(isPro).map((language) => (
                                <Link href={`/register`} key={language} prefetch={false}>
                                    <SelectItem
                                        key={language}
                                        value={language}
                                        className="text-gray-500 dark:text-gray-700/15 py-2 my-1"
                                    >
                                        {LanguagesSupportedMap[language]} (PRO)
                                    </SelectItem>
                                </Link>
                            ))}
                        </>
                    )}
                </SelectContent>



            </Select>
        </div>
    )
}

export default LanguageSelect