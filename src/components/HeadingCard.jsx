const HeadingCard = ({ heading }) => {
  return (
    <div className="mb-4 rounded-3xl shadow-xl bg-primary p-3 lg:p-0">
      <div className="w-full flex items-center justify-between">
        <div className=" md:text-xl lg:text-2xl xl:text-3xl ml-6 py-3 font-semibold text-center text-white whitespace-nowrap break-words">
          {heading}
        </div>

        <div className="hidden lg:block">
          <img
            loading="lazy"
            src="/card_cap.svg"
            alt="Cap for card"
            className="object-cover w-4/5 h-4/5 overflow-hidden"
          />
        </div>
      </div>
    </div>
  );
};

export default HeadingCard;
