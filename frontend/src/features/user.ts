import api from "../utils/axios"

export const getCurrentUser = async () => {
    try {
        const res = await api.get("/me");
        console.log("Current User data", res.data?.data?.user);
        return res.data?.data?.user;
    } catch (error) {
        console.log("Error in getCurrentUser", error);
    }
}


