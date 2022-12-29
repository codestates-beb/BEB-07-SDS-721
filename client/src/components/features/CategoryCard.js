import './CategoryCard.css';

const CategoryCard = (props) => {
  return (
    <div className="card w-[400px] overflow-hidden rounded-2xl bg-white drop-shadow-md transition-all hover:scale-105">
      <img
        src={props.category_img}
        alt="sample"
        className="h-[240px] w-[100%]"
      ></img>
      <div className="card-info flex h-[76px] grow justify-center pt-[20px]">
        <div className="category-type w-10/12">
          <div className="mb-6 flex h-[60px] w-[100%] flex-col items-start">
            <p className="mb-1 text-[22px]">{props.category_name}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
