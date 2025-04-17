import React from "react";
import { ProfileImageContainer } from "./ProfileImageUploader.styles";

interface ProfileImageUploaderProps {
    profileImage: string;
    setFile: (file: File | null) => void;
    setProfileImage: (image: string) => void;
    className?: string;
}

const ProfileImageUploader: React.FC<ProfileImageUploaderProps> = ({
    profileImage,
    setFile,
    setProfileImage,
    className,
}) => {
    const handleProfileImageChange = (
        event: React.ChangeEvent<HTMLInputElement>,
        setFile: (file: File | null) => void,
        setProfileImage: (image: string) => void
    ) => {
        const file = event.target.files?.[0];
        if (file) {
            setFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <ProfileImageContainer
            className={className}
            onClick={() =>
                (
                    document.querySelector("#profileImage") as HTMLInputElement
                )?.click()
            }
        >
            <img src={profileImage} alt="profile_image" />
            <h4>프로필 수정</h4>
            <input
                type="file"
                id="profileImage"
                style={{ display: "none" }}
                accept="image/*"
                onChange={(event) =>
                    handleProfileImageChange(event, setFile, setProfileImage)
                }
            />
        </ProfileImageContainer>
    );
};

export default ProfileImageUploader;
