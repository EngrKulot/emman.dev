// Function to toggle the 'enlarged' class on the clicked image
function toggleImageSize(imageId) {
    const image = document.getElementById(imageId);
    // Toggle the 'enlarged' class to scale the image
    image.classList.toggle('enlarged');
}
