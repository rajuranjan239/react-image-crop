const imageInput = document.getElementById('imageInput');
        const uploadedImage = document.getElementById('uploadedImage');
        const imageContainer = document.getElementById('imageContainer');
        const cropBox = document.getElementById('cropBox');
        const cropButton = document.getElementById('cropButton');

        let isDragging = false;
        let startX, startY;
        let cropBoxX = 0;
        let cropBoxY = 0;
        const cropBoxWidth = 200;
        const cropBoxHeight = 200;

        // Handle image upload
        imageInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    uploadedImage.src = event.target.result;
                    uploadedImage.onload = () => {
                        cropBox.style.display = 'block';
                        cropBox.style.width = cropBoxWidth + 'px';
                        cropBox.style.height = cropBoxHeight + 'px';
                        cropBox.style.left = '0px';
                        cropBox.style.top = '0px';
                        cropButton.disabled = false;
                    };
                };
                reader.readAsDataURL(file);
            }
        });

        // Mouse events for crop box dragging
        cropBox.addEventListener('mousedown', (e) => {
            isDragging = true;
            const rect = cropBox.getBoundingClientRect();
            startX = e.clientX - rect.left;
            startY = e.clientY - rect.top;
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;

            const containerRect = imageContainer.getBoundingClientRect();
            const newX = e.clientX - containerRect.left - startX;
            const newY = e.clientY - containerRect.top - startY;

            // Constrain crop box to image container
            const maxX = containerRect.width - cropBoxWidth;
            const maxY = containerRect.height - cropBoxHeight;

            cropBoxX = Math.max(0, Math.min(newX, maxX));
            cropBoxY = Math.max(0, Math.min(newY, maxY));

            cropBox.style.left = cropBoxX + 'px';
            cropBox.style.top = cropBoxY + 'px';
        });

        document.addEventListener('mouseup', () => {
            isDragging = false;
        });

        // Crop and download functionality
        cropButton.addEventListener('click', () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            // Set canvas dimensions to crop box size
            canvas.width = cropBoxWidth;
            canvas.height = cropBoxHeight;

            // Calculate scale between displayed image and original
            const displayedHeight = uploadedImage.clientHeight;
            const scale = uploadedImage.naturalHeight / displayedHeight;

            // Draw cropped portion to canvas
            ctx.drawImage(
                uploadedImage,
                cropBoxX * scale,
                cropBoxY * scale,
                cropBoxWidth * scale,
                cropBoxHeight * scale,
                0,
                0,
                cropBoxWidth,
                cropBoxHeight
            );

            // Convert to data URL and trigger download
            const croppedImage = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.download = 'cropped-image.png';
            link.href = croppedImage;
            link.click();
        });