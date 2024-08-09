import { CameraView, useCameraPermissions } from "expo-camera"
import { useRef } from "react";
import { View, Text, Button, TouchableOpacity } from "react-native"
import { router } from "expo-router"
import useImage from "@/src/hooks/useImage";

const Camera = () => {
    const [cameraPermissions, requestCameraPermissions] = useCameraPermissions()
    const cameraRef = useRef<CameraView>(null)
    const [_, setImageUrl] = useImage()

    if (!cameraPermissions) { 
        return <View/> 
    }

    if (!cameraPermissions.granted) {
        <View
            style={{
                flex: 1,
                justifyContent: "center"
            }}
        >
            <Text 
                style={{
                    textAlign: "center",
                    paddingBottom: 10
                }}
            >
                We need your permission to show the camera
            </Text>
            <Button onPress={requestCameraPermissions} title="grant permission" />
      </View>
    }

    const takePicture = async () => {
        if (cameraRef.current) {
            const photo = await cameraRef.current.takePictureAsync()
            if (photo?.uri) { setImageUrl(photo?.uri) }
            router.back()
        }
    }

    return (
        <View 
            style={{
                flex: 1,
                justifyContent: "center"
            }}
        >
          <CameraView style={{flex: 1}} facing="back" mode="picture" ref={cameraRef}>
            <View 
                style={{
                    flex: 1,
                    flexDirection: 'row',
                    backgroundColor: 'transparent',
                    margin: 64
                }}
            >
                <TouchableOpacity 
                    style={{
                        flex: 1,
                        alignSelf: 'flex-end',
                        alignItems: 'center'
                    }} 
                    onPress={takePicture}
                >
                <Text
                    style={{
                        fontSize: 24,
                        fontWeight: 'bold',
                        color: 'white'
                    }}
                >
                    Take picture
                </Text>
              </TouchableOpacity>
            </View>
          </CameraView>
        </View>
    )
}

export default Camera
