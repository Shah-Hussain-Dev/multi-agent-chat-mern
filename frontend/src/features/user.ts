import api from "../utils/axios";

export const getCurrentUser = async () => {
    try {
        const res = await api.get("/me");
        console.log("Current User response", res.data);
        const userData = res.data?.data?.user || res.data?.user || res.data?.data || res.data;
        return userData;
    } catch (error) {
        console.log("Error in getCurrentUser", error);
        return null;
    }
};
