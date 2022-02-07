import { loadStripe } from '@stripe/stripe-js'

let stripePromise: any;

const getStripe = () => {
    if (!stripePromise) {
        stripePromise = loadStripe(process.env.STRIPE_API_KEY as string);
    }

    return stripePromise;
}

export default getStripe;