import { createContext, useState } from "react"

export type ImageContextValue = {
    imageUrl: string | null,
    setImageUrl: (url: string | null) => void
}

export const ImageContext = createContext<ImageContextValue>({ 
    imageUrl: null, 
    setImageUrl: (_) => {} 
})

export interface ImageContextProviderProps {
    children: any
}

const ImageContextProvider = (props: ImageContextProviderProps) => {
    const [image, setImage] = useState<string | null>(null)

    return (
        <ImageContext.Provider value={{ imageUrl: image, setImageUrl: (url) => {setImage(url)} }}>
            {props.children}
        </ImageContext.Provider>
    )
}

export default ImageContextProvider