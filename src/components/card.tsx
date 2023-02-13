import { withUseFeature } from "@/context/featureContext";

const Card = () => {
    return (
        <div className="card">
            <div className="card__image">
                <img src="https://picsum.photos/200/300" alt="random" />
            </div>
            <div className="card__content">
                <h3 className="card__title">Card Title</h3>
                <p className="card__description">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quisquam, quae.
                </p>
                <button className="card__button">Read More</button>
            </div>
        </div>
    );
};


export default withUseFeature("feature1")(Card);