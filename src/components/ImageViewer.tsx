import { StyleSheet, Image } from "react-native";

// create props that pass in the image source and style

const styles = StyleSheet.create({
    imageBox: {
        width: '60%',
        height: '50%',
        borderRadius: 10,
    }
});

type ImageViewerProps = {
    src: string;
}

const ImageViewer: React.FC<ImageViewerProps> = ({src}) => {
    return (
        <Image src={src} style={styles.imageBox}/>
    );
}

export default ImageViewer;