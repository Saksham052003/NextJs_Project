'use client';
import React, { useState } from 'react';
import style from './home.module.css';
import Link from 'next/link';

const Homepage: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [isFormvalid, setFormvalid]= useState(true)

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setImage(file);
  };

  const handleSubmit = () => {
    if (!title || !description || !image) {
      alert('Please fill in all required fields: Title, Description, and Image.');
      setFormvalid(false)
      return;
    }
    const finalLink = link.trim() === '' ? '#' : link;

    const data = {
      title,
      description,
      link: finalLink,
      image: image ? URL.createObjectURL(image) : null,
    };

    localStorage.setItem('formData', JSON.stringify(data));

    setTitle('');
    setDescription('');
    setLink('');
    setImage(null);
    <Link href='/Components/BannerImageComp'></Link>
  };

  return (
    <div className={style.home + ' mt-20'}>
      <h1 className={style.h1}>This is an Assignment Website</h1>
      <form className={style.form}>
        <div>
          <label htmlFor="title" className={style.label}>Title:</label>
          <input
            type="text"
            id="title"
            className={style.inputField}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="description" className={style.label}>Description:</label>
          <textarea
            id="description"
            className={style.textareaField}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="link" className={style.label}>Link:</label>
          <input
            type="url"
            id="link"
            className={style.inputField}
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="image" className={style.label}>Select Image:</label>
          <input
            type="file"
            id="image"
            className={style.fileInput}
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        <Link href='/Components/BannerImageComp'>
         <button type="button" className={style.button} onClick={handleSubmit}>
          Submit
        </button>
        </Link>
      </form>
    </div>
  );
};

export default Homepage;
