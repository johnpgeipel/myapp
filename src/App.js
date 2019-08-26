import React, { Component } from "react";
import ImageCard from "./components/ImageCard";
import Header from "./components/Header";
import Wrapper from "./components/Wrapper";
import ScoreBar from "./components/ScoreBar";
import images from "./images.json";
import "./App.css";

class App extends Component {
    state = {
        images,
        clickedImages: [],
        score: 0
    };

    // method for randomly sorting the images array
    shuffleCards = array => {
        array.sort((a, b) => 0.5 - Math.random());
        return array;
    };

   
    imageClick = event => {
        console.log(event.target);
        const currentImage = event.target.alt;
        const alreadyClicked = this.state.clickedImages.indexOf(currentImage) > -1;

        
        if (alreadyClicked) {
            alert("You lost!");
            this.setState({
                images: this.shuffleCards(images),
                clickedImages: [],
                score: 0
            });
        } else {
            
            this.setState(
                {
                    images: this.shuffleCards(images),
                    clickedImages: this.state.clickedImages.concat(currentImage),
                    score: this.state.score + 1
                },
                
                () => {
                    if (this.state.score === 12) {
                        alert("You win!");
                        this.setState({
                            images: this.shuffleCards(images),
                            clickedImages: [],
                            score: 0
                        });
                    }
                }
            );
        }
    };

    render() {
        return (
            <div> 
                <Header 
                    title="Clicky Game" 
                    desc="A React based memory game."
                    rules="Click on an image to earn points, but don't click on an image more than once." 
                />
                <ScoreBar score={this.state.score} />
                <Wrapper>
                    
                    {this.state.images.map(image => (
                        <ImageCard 
                            imageClick={this.imageClick}
                            id={image.id}
                            key={image.id}
                            image={image.imageURL}
                        />
                    ))}
                </Wrapper>
            </div>
        );
    }
}

export default App;