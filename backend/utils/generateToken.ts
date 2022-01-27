import jwt from 'jsonwebtoken';

const generateToken = (id: string) => {
    const token = jwt.sign({ id }, process.env.JWT_SECRET as string);
    return token;
}

export default generateToken;