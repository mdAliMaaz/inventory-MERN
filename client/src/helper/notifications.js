import toast from "react-hot-toast";


export const handleSuccess = (message) => {
    toast.success(message)
}

export const handleError = (message) => {
    toast.error(message)
};