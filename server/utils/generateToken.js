import JWT from 'jsonwebtoken';

export const generateToken = (options, res) => {

    const token = JWT.sign(options, process.env.JWT_SECRET, { expiresIn: "30d" });


    res.cookie("token", token, { httpOnly: true });

    return token;
}