import React, { useState, useEffect } from 'react';
import './App.css';
import { Form, FormGroup, Card, Icon, Image } from 'semantic-ui-react';


function App() {
  const [name, setName] = useState("");
  const [userName, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [url, setProfilelink] = useState("");
  const [repos, setRepos] = useState("");
  const [avatar, setAvatar] = useState("");
  const [follower, setFollowers] = useState("");
  const [userInput, setUserinput] = useState("");
  const [error, setError] = useState(null);

useEffect(() => { 
      fetch('https://api.github.com/users/example')
      .then(res => res.json())
      .then(data => (
        setData(data)
        ));
}, []);

const setData = ({
name, 
login, 
location, 
email, 
bio, 
url, 
follower, 
public_repos, 
avatar_url}) => {
setName(name);
setUsername(login);
setLocation(location);
setEmail(email);
setBio(bio);
setProfilelink(url);
setFollowers(follower);
setRepos(public_repos);
setAvatar(avatar_url);

  
};

const handleSearch = (e) => {
  
  setUserinput(e.target.value)
}

const handleSubmit =(e) => {
  fetch(`https://api.github.com/users/${userInput}`)
  .then(res => res.json())
  .then(data =>{
    if(data.message){
      setError(data.message);
    }else{
      setData(data);
      setError(null);
    }
    
  })
  e.preventDefault();
}


  return (
      <div>
        <div className="navbar">
           Github User Details
        </div>
        <div className="search">
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Form.Input placeholder="Github User" name="githubusernme" onChange={handleSearch} />
              <Form.Button content='search' />
            </FormGroup>
          </Form>
        </div>
        {error ? (<h1>{error}</h1>): (
        <div className="card">
          <Card>
            <Image src={avatar} />
            <Card.Content>
              <Card.Header>{name}</Card.Header>
              <Card.Header>{userName}</Card.Header>
            </Card.Content>
            <Card.Content extra>
              <a href='/'>
                <Icon name='user' />
                {location}: Location
              </a>
            </Card.Content>
            <Card.Content extra>
              <a href="/">
                <Icon name='user' />
                {email}: Email
              </a>
            </Card.Content>
            <Card.Content extra>
              <a href="/">
                <Icon name='user' />
                {bio}: BIO
              </a>
            </Card.Content>
            <Card.Content extra>
              <a href="/">
                <Icon name='user' />
                {url}: Profile Link
              </a>
            </Card.Content>
            <Card.Content extra>
              <a href="/">
                <Icon name='user' />
                {repos}: Total No of Starred Repo's
              </a>
            </Card.Content>
            <Card.Content extra>
              <a href='/'>
                <Icon name='user' />
                {follower}: Followers
              </a>
            </Card.Content>
          </Card>
          
        </div>
        )}
      </div>
      
  );
}

export default App;
