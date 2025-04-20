import React, { useRef, useState } from 'react'
import { LuUser, LuUpload, LuTrash } from 'react-icons/lu'

const ProfilePhotoSelector = ({ image, setImage }) => {
    const inputRef = useRef(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(file);
            const preview = URL.createObjectURL(file);
            setPreviewUrl(preview);
        }
    };

    const handleRemoveImage = () => {
        setImage(null);
        setPreviewUrl(null);
    };

    const onChooseImage = () => {
        inputRef.current.click();
    };

    return (
        <div className="flex justify-center mb-6">
            <input
                type="file"
                accept="image/*"
                ref={inputRef}
                onChange={handleImageChange}
                className="hidden"
            />

            <div className="relative w-24 h-24">
                <div
                    className="w-24 h-24 rounded-full bg-blue-100/50 flex items-center justify-center overflow-hidden shadow-sm"
                    onClick={onChooseImage}
                >
                    {previewUrl ? (
                        <img
                            src={previewUrl}
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <LuUser className="text-4xl text-blue-600" />
                    )}
                </div>

                <button
                    type="button"
                    onClick={previewUrl ? handleRemoveImage : onChooseImage}
                    className="absolute -bottom-1 right-0 bg-blue-600 hover:bg-blue-700 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-md transition"
                    title={previewUrl ? "Remove photo" : "Upload photo"}
                >
                    {previewUrl ? <LuTrash size={16} /> : <LuUpload size={16} />}
                </button>
            </div>
        </div>
    )
}

export default ProfilePhotoSelector;
