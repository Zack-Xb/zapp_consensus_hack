import { StyleSheet, Image, Dimensions } from "react-native";

// create props that pass in the image source and style

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  imageBox: {
    width: width * 0.8,
    height: height * 0.5,
  },
});

type ImageViewerProps = {
  src: string;
};

const ImageViewer: React.FC<ImageViewerProps> = ({ src }) => {
  return (
    <Image
      source={{ uri: src }}
      style={styles.imageBox}
      resizeMode="contain"
    />
  );
};

export default ImageViewer;
