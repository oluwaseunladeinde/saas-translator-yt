import { db } from '@/firebase';
import { Subscription } from '@/types/subscription';
import {
    DocumentData,
    FirestoreDataConverter,
    QueryDocumentSnapshot,
    SnapshotOptions,
    collection
} from 'firebase/firestore';

const subscriptionConverter: FirestoreDataConverter<Subscription> = {
    toFirestore: function (subscription: Subscription): DocumentData {
        return {
            ...subscription
        }
    },
    fromFirestore: function (snapshot: QueryDocumentSnapshot, options: SnapshotOptions): Subscription {
        const data = snapshot.data(options);
        const sub: Subscription = {
            id: snapshot.id,
            metadata: data.metadata,
            stripeLink: data.stripeLink,
            role: data.role,
            quantity: data.quantity,
            items: data.items,
            cancel_at_period_end: data.cancel_at_period_end,
            created: data.created,
            current_period_end: data.current_period_end,
            current_period_start: data.current_period_start,
            ended_at: data.ended_at,
            prices: data.prices,
            product: data.product,
            status: data.status,
            trial_end: data.trial_end,
            trial_start: data.trial_start,
            latest_invoice: data.latest_invoice,
            payment_method: data.payment_method,
            cancel_at: data.cancel_at,
            price: data.price,
        }
        return sub;
    }
}

export const subscriptionRef = (userId: string) => {
    collection(db, 'customers', userId, 'subscriptions').withConverter(subscriptionConverter)
}