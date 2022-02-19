export interface ICreateReview {
    rating: number,
    comment: string
}

interface IReviews extends ICreateReview {   
    user: {},
}

export type TImage = {
    _id?: string,
    image: string
}

export interface IRoom {
    _id: string,
    name: string
    description: string,
    images: TImage[],
    pricePerNight: Number,
    address: string,
    guestCapacity: Number,
    numOfBeds: Number,
    breakfast: Boolean,
    internet: Boolean,
    airConditioned: Boolean,
    petsAllowed: Boolean,
    roomCleaning: Boolean,
    ratings?: Number,
    numOfReviews?: Number,
    category: 'King' | 'Single' | 'Twins' | string,
    reviews?: IReviews[],
    createdAt: Date,
}

export type TCreateRoom = Pick<IRoom, "name" | "description" | "address" | "guestCapacity" | "numOfBeds" | "category" | "internet" | "airConditioned" | "breakfast" | "petsAllowed" | "roomCleaning" | "pricePerNight" | "images" >
