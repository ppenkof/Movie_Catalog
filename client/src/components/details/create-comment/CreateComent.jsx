import { useState } from "react";
import request from "../../../utils/request";
import { useParams } from "react-router";

export default function CreateComent({
    user,
    onCreate
}) {   
    const {gameId} = useParams();
    const [comment, setComment] = useState('');
    const changeHandler = (e) => {
        setComment(e.target.value);
    };

    const submitHandler = async () => { console.log(user.email, comment, gameId);
        try {
            await request('/comments', 'POST', {
            author: user.email,
            message: comment,
            gameId
        });

        setComment('');
        onCreate();

        } catch (error) {
            alert(error.message);
        }
      
    }


    return (
        <article className="create-comment">
            <label>Add new comment:</label>
            <form className="form" action = {submitHandler}>
                <textarea 
                name="comment" 
                placeholder="Comment......"
                onChange={changeHandler}
                ></textarea>
                <input 
                    className="btn submit" 
                    type="submit" 
                    value="Add Comment"
                    disabled={!user}
                />
            </form>
        </article>
    );
}