import { useContext } from "react"
import { ImageContext } from "../context/ImageContextProvider"

type useImageType = () => [string | null, (newImage: string | null) => void]

const useImage: useImageType = () => {
    const {imageUrl, setImageUrl} = useContext(ImageContext)
    return [imageUrl, setImageUrl]
}

export default useImage