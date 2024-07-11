import Signin from "../pages/auth/Signin";
import Signup from "../pages/auth/Signup";

export const commonRoutes = [
    {
        id: 1,
        path: '/signin',
        element: Signin
    },
    {
        id: 2,
        path: '/signup',
        element: Signup
    }
]