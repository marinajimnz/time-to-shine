/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import Parse from '../parseConfig'; // Importing the Parse configuration for Back4App.
import logoPredef from '/public/logo.svg'; // Default logo for the profile.

const Profile = ({ teamData, setTeamData }) => {
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false); // State to manage the visibility of the photo modal.
  const [selectedFile, setSelectedFile] = useState(null); // State to handle the file selected for upload.

  // useEffect to fetch the user's logo when the component mounts.
  useEffect(() => {
    const fetchUserLogo = async () => {
      try {
        const currentUser = Parse.User.current(); // Retrieve the current authenticated user.
        if (currentUser) {
          const logo = currentUser.get('logo'); // Get the user's logo.
          const logoUrl = logo && typeof logo.url === 'function' ? logo.url() : null; // Validate and get the logo URL.

          // Update teamData state with the logo.
          setTeamData((prevData) => ({
            ...prevData,
            logo: logoUrl || prevData.logo, // Keep the default logo if none exists.
          }));
        }
      } catch (error) {
        console.error('Error fetching the user logo:', error.message);
      }
    };

    fetchUserLogo();
  }, [setTeamData]);

  // Handles file selection when uploading a new profile photo.
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file); // Updates the state with the selected file.
      console.log('File selected:', file);
    }
  };

  // Saves the selected photo to Back4App.
  const handleSavePhoto = async () => {
    if (!selectedFile) {
      console.error('No file selected.');
      return;
    }

    try {
      const parseFile = new Parse.File(selectedFile.name, selectedFile); // Creates a Parse file object.
      console.log('Saving file to Parse...', parseFile);

      await parseFile.save(); // Saves the file to Back4App.
      console.log('File saved successfully:', parseFile.url());

      const currentUser = Parse.User.current(); // Gets the current authenticated user.
      if (!currentUser) {
        console.error('No authenticated user.');
        return;
      }

      currentUser.set('logo', parseFile); // Assigns the uploaded file as the user's logo.
      await currentUser.save(); // Saves the changes to the user object.

      setTeamData((prevData) => ({ ...prevData, logo: parseFile.url() })); // Updates the local state with the new logo.

      setIsPhotoModalOpen(false); // Closes the modal.
      setSelectedFile(null); // Resets the file selection.
    } catch (error) {
      console.error('Error saving the photo to Back4App:', error.message);
    }
  };

  return (
    <div>
      {/* Profile image and team name */}
      <div
        className="flex items-center cursor-pointer"
        onClick={() => setIsPhotoModalOpen(true)} // Opens the photo modal.
      >
        <img
          src={teamData.logo || logoPredef} // Displays the current logo or default logo.
          alt="Profile logo"
          className="h-20 w-20 rounded-full border border-star-orange"
        />
        <span className="ml-4 text-xl font-semibold text-primary-white">
          {teamData.teamName || 'Team Name'} {/* Displays the team's name or a placeholder.*/}
        </span>
      </div>

      {/* Modal for changing the profile photo */}
      {isPhotoModalOpen && (
        <div className="fixed inset-0 bg-primary-gray bg-opacity-60 flex items-center justify-center z-10">
          <div className="bg-secondary-gray p-6 rounded-lg shadow-lg text-center relative">
            {/* Close button */}
            <button
              className="absolute top-2 right-2 text-primary-white text-2xl focus:outline-none mr-2"
              onClick={() => setIsPhotoModalOpen(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <h2 className="text-lg font-semibold mb-4 text-primary-white">
              Change Profile Photo
            </h2>

            {/* File input for uploading a photo */}
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange} // Triggered when a file is selected.
              className="block w-full text-sm text-primary-white mb-4
                         file:mr-4 file:py-2 file:px-4
                         file:rounded-lg file:border file:border-transparent
                         file:text-base file:font-medium file:bg-star-orange 
                         file:text-primary-gray file:hover:border-primary-white 
                         file:focus:outline-auto focus:ring-2 file:focus:ring-primary-white"
            />

            {/* Button to save the uploaded photo */}
            <button
              onClick={handleSavePhoto}
              className="mt-4 px-6 py-2 bg-star-orange text-primary-gray rounded-lg hover:border-primary-white focus:outline-none focus:ring-2 focus:ring-primary-white"
            >
              Save Photo
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
