import { Subscription } from '@/types/subscription';
import { create } from 'zustand';

export type LanguagesSupported =
    | 'en'
    | 'fr'
    | 'de'
    | 'es'
    | 'it'
    | 'pt'
    | 'ru'
    | 'ja'
    | 'zh'
    | 'ko'
    | 'vi'
    | 'ar';

export const LanguagesSupportedMap: Record<LanguagesSupported, string> = {
    en: 'English',
    de: 'German',
    fr: 'French',
    es: 'Spanish',
    it: 'Italian',
    pt: 'Portuguese',
    ru: 'Russian',
    ar: 'Argentina',
    ja: 'Japanese',
    zh: 'Chinese',
    ko: 'Korean',
    vi: 'Vietnamese'
};

const LANGUAGES_IN_FREE = 2;

interface LanguageState {
    language: LanguagesSupported;
    setLanguage: (language: LanguagesSupported) => void;
    getLanguages: (isPro: boolean) => LanguagesSupported[];
    getNotSupportedLanguages: (isPro: boolean) => LanguagesSupported[];
}

export const useLanguageStore = create<LanguageState>((set, get) => ({
    language: 'en',
    setLanguage: (language: LanguagesSupported) => set({ language }),
    getLanguages: (isPro: boolean) => {
        //if user is pro, return all supoorted languages
        if (isPro)
            return Object.keys(LanguagesSupportedMap) as LanguagesSupported[];

        // if not pro, return only the first two languages
        return Object.keys(LanguagesSupportedMap).slice(0, LANGUAGES_IN_FREE) as LanguagesSupported[];
    },
    getNotSupportedLanguages(isPro: boolean) {
        //No unsupoorted languages for pro users
        if (isPro) return [];

        // excluded the first two supported languages
        return Object.keys(LanguagesSupportedMap).slice(LANGUAGES_IN_FREE) as LanguagesSupported[];
    },
}));

interface SubscriptionState {
    subscription: Subscription | null | undefined;
    setSubscription: (subscription: Subscription | null | undefined) => void;
}

export const useSubscriptionStore = create<SubscriptionState>((set) => ({
    subscription: undefined,
    setSubscription: (subscription: Subscription | null | undefined) => {
        set({ subscription });
    }
}));
