
const HeadingCard = ({heading}) => {
  return (

    <div className="mb-4 rounded-3xl shadow-xl max-md:px-5 bg-primary ">
      <div className="w-full flex px-3 items-center justify-between">
        <div className="text-3xl ml-6 font-semibold text-center text-white whitespace-nowrap">
          {heading}
        </div>

        <div className=" mx-5 max-lg:hidden">
          <img
            loading="lazy"
            src="/card_cap.svg" 
            alt="Cap for card"
            className=" object-cover w-4/5 h-4/5 overflow-hidden  "
            
          />
        </div>
      </div>
    </div>
  );
};

export default HeadingCard;
