'use client';
import React, { useState, useEffect } from 'react';
import style from './EditBannerTemplateBs.module.css';

const EditBannerTemplateBs = ({
    onClose,
    onSave
}: { 
    onClose: () => void,
    onSave: (updatedData: { title?: string; description?: string; link?: string; image?: string | null }) => void 
}) => {
    const [formData, setFormData] = useState<{ title: string; description: string; link: string; image: string | null } | null>(null);
    const [updatedField, setUpdatedField] = useState<{ title?: string; description?: string; link?: string; image?: string | null }>({});
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    useEffect(() => {
        const storedData = localStorage.getItem('formData');
        if (storedData) {
            try {
                const data = JSON.parse(storedData);
                setFormData(data);
                setImagePreview(data.image || null);
            } catch (error) {
                console.error('Error parsing stored data:', error);
            }
        }
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setUpdatedField(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const imageUrl = reader.result as string;
                setImagePreview(imageUrl);
                setUpdatedField(prev => ({ ...prev, image: imageUrl }));
            };
            reader.readAsDataURL(file); // Read the file as a Data URL
        }
    };

    const handleSubmit = () => {
        if (formData) {
            const updatedData = { ...formData, ...updatedField };
            localStorage.setItem('formData', JSON.stringify(updatedData));
            setFormData(updatedData);
            onSave(updatedData); // Notify parent component of the changes
        }
        onClose(); // Close the bottom sheet after saving
    };

    return (
        <div className={style.overlay}>
            <div className={style.sheet}>
                <button className={style.closeButton} onClick={onClose}>×</button>
                <h2>Edit Banner Template</h2>
                <label>
                    Title:
                    <input
                        type="text"
                        name="title"
                        defaultValue={formData?.title || ''}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Description:
                    <textarea
                        name="description"
                        defaultValue={formData?.description || ''}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Link:
                    <input
                        type="text"
                        name="link"
                        defaultValue={formData?.link || ''}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Image URL:
                    <input
                        type="text"
                        name="image"
                        defaultValue={formData?.image || ''}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Upload New Image:
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                </label>
                <button onClick={handleSubmit}>Save</button>
            </div>
        </div>
    );
};

export default EditBannerTemplateBs;
