import './Explore.css';
// import { useNavigate } from 'react-router-dom';

import CategoryCard from 'components/features/CategoryCard';

import categorySample1 from 'img/category_sample_1.jpg';
import categorySample2 from 'img/category_sample_2.jpg';
import categorySample3 from 'img/category_sample_3.jpg';
import categorySample4 from 'img/category_sample_4.jpg';

const Explore = () => {
  // const navigate = useNavigate();

  return (
    <div className="explore mx-auto pt-[2rem]">
      <div className="text-center">
        <h1 className="text-6xl">Explore Categories</h1>
        <h2 className="pt-[2rem] text-2xl">
          An online community of makers, developers,
        </h2>
        <h2 className="text-2xl">
          and traders is pushing the art world into new territory.
        </h2>
      </div>

      <div className="flex flex-wrap justify-center gap-4 px-[2rem] py-[1rem]">
        <div className="">
          <CategoryCard category_img={categorySample1} category_name="Man" />
        </div>

        <div className="">
          <CategoryCard category_img={categorySample2} category_name="Woman" />
        </div>
      </div>

      <div className="categoryCard flex flex-wrap justify-center gap-4 px-[2rem] py-[1rem]">
        <div className="">
          <CategoryCard category_img={categorySample3} category_name="Dog" />
        </div>

        <div className="">
          <CategoryCard category_img={categorySample4} category_name="Cat" />
        </div>
      </div>
    </div>
  );
};

export default Explore;
