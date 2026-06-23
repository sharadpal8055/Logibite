import Categories from "../components/home/Categories";
import FeaturedRestaurants from "../components/home/FeaturedRestaurants";
import Hero from "../components/home/Hero";
import PopularFoods from "../components/home/PopularFoods";

function Home() {
  return (
    <>
    <Hero/>
    <Categories/>
    <FeaturedRestaurants/>
    <PopularFoods/>
    </>
  );
}

export default Home;