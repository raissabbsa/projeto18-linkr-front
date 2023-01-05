import axios from "axios";
import { useContext, useState } from "react"
import styled from "styled-components"
import { BASE_URL } from "../../constants/urls";
import { UserContext } from "../../providers/UserData";

export default function Publishing(){
    const [form, setForm] = useState({link: "", description: ""});
    const [loading, setLoading] = useState(false);
    const {userData} = useContext(UserContext);

    function fillForm(e){
        setForm({...form, [e.target.name]: e.target.value});
    }
    function publish(e){
        e.preventDefault();
        setLoading(true);

        let hashtags = verifyHashtag(form.description);
        
        const config = { headers: { Authorization: `Bearer ${userData.token}` } };
        const promise = axios.post(`${BASE_URL}/posts`, form, config);
        promise.then(res => {
            setForm({link: "", description: ""});
            setLoading(false);
            //atualizar lista de posts
        });
        promise.catch((err) => {
            console.log(err);
            alert("Houve um erro ao publicar seu link");
            setLoading(false);
        });

        if(hashtags.length > 0){
            publishHashtags(hashtags);
            console.log(hashtags);
        }
    }

    //let hashtags = ["gelatto", "italy", "vegan"];
    //publishHashtags(hashtags);
    function publishHashtags(array){
            const promise = axios.post(`${BASE_URL}/trending`, array); 
            promise.then(res => {
                console.log("okay");
            }).catch(err => {
                console.log(err);
            });
    }

    function verifyHashtag(text){
        let array = text.split(" ");
        let hashtags = [];
        array.map(item => {
            if(item[0] === "#"){
                hashtags.push(item.substr(1));
            }
            return "";
        });
        return hashtags;
    }
    return(
        <PublishContainer>
            <img src={userData.picture_url} alt = "img"/>
            <ShareCotainer>
                <h1>What are you going to share today?</h1>
                <Form onSubmit={publish}>
                    <input placeholder="http:// ..."
                        name="link"
                        value={form.link}
                        type="url"
                        onChange={fillForm}
                        disabled={loading ? "disabled" : ""}
                        required
                        />
                    <input placeholder="Awesome article about #javascript"
                        name="description"
                        value={form.description}
                        type="text"
                        onChange={fillForm}
                        disabled={loading ? "disabled" : ""}/>
                    <button type="submit" disabled={loading ? "disabled" : ""}>
                        {loading ? "Publishing ..." : "Publish"}
                    </button>
                </Form>
            </ShareCotainer>
        </PublishContainer> 
    )
}
const PublishContainer = styled.div`
    height: 209px;
    background-color: #FFFFFF;
    border: none;
    border-radius: 10px;
    width: 611px;
    padding: 20px;
    display: flex;
    margin-bottom: 29px;
    img{
        width: 50px;
        height: 50px;
        margin-right: 20px;
        border-radius: 1000px;
    }
`
const ShareCotainer = styled.div`
    display: flex;
    flex-direction: column;
    &>h1{
        color: #828282;
        font-size: 20px;
        margin-bottom: 10px;
    }
    
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
    input{
        width: 500px;
        height: 40px;
        border: none;
        border-radius: 5px;
        background-color: #EFEFEF;
        margin-bottom: 5px;
        padding: 10px;
        font-size: 14px;
    }
    input:nth-child(2){
        height: 60px;
    }

    button{
        width: 100px;
        height: 35px;
        background-color: #1977F2;
        border: none;
        border-radius: 5px;
        color: #FFFFFF;
        font-weight: 600;
        padding: 5px;
        margin-left: 400px;
        cursor: pointer;
    }
`
