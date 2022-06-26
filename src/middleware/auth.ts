const jwt = require('jsonwebtoken');

exports.auth = (req: any, res: any, next: any) => {
    try{
        const token = req.header('x-auth-token');
        if (!token) {
            return res.status(401).json({ message: 'No token, authorization denied' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    }catch(err){
        console.log(err);
        res.status(500).json({message: "Server Error"});
    }
}