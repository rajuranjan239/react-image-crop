# react-image-crop-tool
A simple and customizable image cropping tool built with React. This tool allows users to upload and crop images with ease, providing an intuitive interface for selecting and adjusting the crop area. Perfect for applications that require image editing, resizing, or uploading cropped images.

Let me break down what each part of the image cropper code does:

1. **HTML Structure**:
   - Creates a container with a file input button
   - Has a display area for the uploaded image
   - Contains an invisible crop box that appears after image upload
   - Has a "Crop & Download" button

2. **CSS Styling**:
   - Centers the container and sets max width
   - Creates a fixed-height container for the image
   - Styles the crop box with a blue border and semi-transparent background
   - Makes the crop box draggable with a "move" cursor
   - Styles the buttons and input elements

3. **JavaScript Functionality**:
   - **Image Upload**:
     - Listens for file selection
     - Reads the selected image file
     - Displays it in the container
     - Shows the crop box once image is loaded

   - **Drag and Drop**:
     - Makes the crop box draggable within the image bounds
     - Tracks mouse position while dragging
     - Prevents crop box from going outside image boundaries

   - **Cropping Process**:
     - When "Crop & Download" is clicked:
     - Creates a canvas element
     - Calculates the correct scale between displayed and original image
     - Draws only the selected portion to the canvas
     - Converts the cropped area to PNG format
     - Triggers automatic download of the cropped image