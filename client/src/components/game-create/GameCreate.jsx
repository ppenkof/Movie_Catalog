import { useNavigate } from "react-router";
import request from "../../utils/request";
import { useEffect, useState } from "react";
import {getDownloadURL, ref, uploadBytes} from 'firebase/storage';
import { storage } from "../../firebase";

export default function GameCreate() {
    const navigate = useNavigate();
    const [imageUpload, setImageUpload] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        return () => {
            URL.revokeObjectURL(imagePreview);
            setImagePreview(null);
        };
    }, [imageUpload]);

    const createGameHandler = async (e) => {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const {image, ...data} = Object.fromEntries(formData);

        if (imageUpload) {
            const imageRef = ref(storage, `images/${image.name}`);
            uploadBytes(imageRef, image)
            data.imageUrl = await getDownloadURL(imageRef).then((url) => {
                data.imageUrl = url;
            });
        } else {
            data.imageUrl = image;
        }

        data.players=Number(data.players);
        data._createdOn=Date.now();

        // const response = await fetch('http://localhost:3030/jsonstore/games', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(data)
        // });

        // const result = await response.json();
        const result = await request('/games', 'POST', data);
        console.log(result);
        
        navigate('/games');
    }

    const imageChangeHandler = (e) => {
        const image = e.target.files[0];
        const imageUrl = URL.createObjectURL(image);

        setImagePreview(imageUrl);
    }

    const imageUploadClickHandler = () => {
        setImageUpload(state => !state);
    }

    return (
        <section id="add-page">
        <form id="add-new-game" onSubmit={createGameHandler}>
            <div className="container">

                <h1>Add New Game</h1>

                <div className="form-group-half">
                    <label htmlFor="gameName">Game Name:</label>
                    <input type="text" id="gameName" name="title" placeholder="Enter game title..."/>
                </div>

                <div className="form-group-half">
                    <label htmlFor="genre">Genre:</label>
                    <input type="text" id="genre" name="genre" placeholder="Enter game genre..."/>
                </div>

                <div className="form-group-half">
                    <label htmlFor="activePlayers">Active Players:</label>
                    <input type="number" id="activePlayers" name="players" min="0" placeholder="0"/>
                </div>

                <div className="form-group-half">
                    <label htmlFor="releaseDate">Release Date:</label>
                    <input type="date" id="releaseDate" name="date"/>
                </div>

                <div className="form-group-full">
                    <label htmlFor="imageUrl">{imageUpload ? 'Image Upload': 'Image Url'}</label>
                    <button type="button" className="details-button" onClick = {imageUploadClickHandler}>{imageUpload ? 'Image Url': 'Image Upload'}</button>
                    {imageUpload 
                        ? <input type="file" id="image" name="image" placeholder="Upload file..." onChange={imageChangeHandler}/>
                        : <input type="text" id="image" name="image" placeholder="Enter image URL..."/>
                    }

                    {imagePreview && 
                    <img className="image-preview" src={imagePreview} alt="preview-image"/>
                    }

                </div>

                <div className="form-group-full">
                    <label htmlFor="summary">Summary:</label>
                    <textarea name="summary" id="summary" rows="5" placeholder="Write a brief summary..."></textarea>
                </div>

                <input className="btn submit" type="submit" value="ADD GAME"/>
            </div>
        </form>
    </section>
    );
}