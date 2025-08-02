document.getElementById('upload-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const fileInput = document.getElementById('image-input');
    const resultDiv = document.getElementById('result');

    if (fileInput.files.length > 0) {
        resultDiv.innerHTML = '<p>Processing your image... please wait.</p>';

        const file = fileInput.files[0];
        const formData = new FormData();
        formData.append('image', file);

        // --- IMPORTANT ---
        // This URL is for a local server. When you deploy your backend on Railway,
        // you must change this URL to your live server's URL.
        const serverUrl = 'http://127.0.0.1:5000/upscale'; 
        // -----------------

        fetch(serverUrl, {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            // The response from the server tells us where the upscaled image is.
            if (data.upscaled_image_url) {
                // In a real scenario, you would use the URL from the server.
                // For this example, we will just show the original uploaded image as a placeholder.
                const uploadedImage = URL.createObjectURL(file);
                resultDiv.innerHTML = `
                    <h3>Upscaling Complete!</h3>
                    <img src="${uploadedImage}" alt="Upscaled Image" style="max-width: 100%; height: auto; border-radius: 5px; margin-top: 20px;">
                    <p>Note: The real upscaled image would be from the server.</p>
                    <a href="${uploadedImage}" download="upscaled-image.png" class="download-button">Download Upscaled Image</a>
                `;
            } else {
                resultDiv.innerHTML = `<p>Error: ${data.error}</p>`;
            }
        })
        .catch(error => {
            console.error('Error:', error);
            resultDiv.innerHTML = '<p>An error occurred. Please try again.</p>';
        });
        
    } else {
        resultDiv.innerHTML = '<p>Please select an image to upload.</p>';
    }
});
